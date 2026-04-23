package com.homeappliance_commerce.ai_service.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homeappliance_commerce.ai_service.client.IProductApi;
import com.homeappliance_commerce.ai_service.client.ISaleApi;
import com.homeappliance_commerce.ai_service.dto.*;
import com.homeappliance_commerce.ai_service.service.IAiAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiAnalysisService implements IAiAnalysisService {

    private final ISaleApi saleApi;
    private final IProductApi productApi;
    private final RestClient groqRestClient;
    private final ObjectMapper objectMapper;

    @Value("${groq.model}")
    private String model;

    @Override
    public AnalysisResponseDTO generateAnalysis(String period) {
        int days = "week".equals(period) ? 7 : 30;
        LocalDate cutoff = LocalDate.now().minusDays(days);

        List<SaleDTO> allSales = saleApi.getAll();
        List<SaleDTO> filteredSales = allSales.stream()
                .filter(sale -> {
                    try {
                        LocalDate saleDate = LocalDate.parse(sale.getDate(), DateTimeFormatter.ISO_LOCAL_DATE);
                        return !saleDate.isBefore(cutoff);
                    } catch (Exception e) {
                        return false;
                    }
                })
                .collect(Collectors.toList());

        Map<String, Object> productPage = productApi.findAll(0, 100);
        List<Map<String, Object>> rawProducts = (List<Map<String, Object>>) productPage.get("content");

        List<ProductDTO> products = rawProducts.stream()
                .map(map -> {
                    ProductDTO p = new ProductDTO();
                    p.setId(((Number) map.get("id")).longValue());
                    p.setName((String) map.get("name"));
                    p.setBrand((String) map.get("brand"));
                    p.setPrice(new BigDecimal(map.get("price").toString()));
                    p.setStock(((Number) map.get("stock")).intValue());
                    p.setDescription((String) map.get("description"));
                    return p;
                })
                .collect(Collectors.toList());

        BigDecimal totalRevenue = filteredSales.stream()
                .map(SaleDTO::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        String soldProductsList = filteredSales.stream()
                .flatMap(sale -> sale.getProducts().stream())
                .collect(Collectors.groupingBy(
                        SaleProductDTO::getName,
                        Collectors.summingInt(SaleProductDTO::getQuantity)
                ))
                .entrySet().stream()
                .map(e -> "- " + e.getKey() + ": " + e.getValue() + " unidades")
                .collect(Collectors.joining("\n"));

        String lowStockList = products.stream()
                .filter(p -> p.getStock() <= 5)
                .map(p -> "- " + p.getName() + " (" + p.getBrand() + "): " + p.getStock() + " unidades")
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
                Sos un analista de negocios de una tienda de electrodomésticos. Analizá estos datos y respondé ÚNICAMENTE con un JSON válido, sin texto adicional, sin markdown, sin bloques de código.

                PERÍODO: últimos %d días
                TOTAL DE VENTAS: %d
                REVENUE TOTAL: $%s
                PRODUCTOS VENDIDOS:
                %s
                STOCK ACTUAL BAJO (≤5 unidades):
                %s

                Respondé con este JSON exacto:
                {
                  "summary": "Resumen ejecutivo de 3-4 oraciones en español con tendencias y productos destacados.",
                  "recommendations": [
                    "Recomendación 1 concreta y accionable",
                    "Recomendación 2 concreta y accionable",
                    "Recomendación 3 concreta y accionable"
                  ]
                }
                """,
                days,
                filteredSales.size(),
                totalRevenue.toPlainString(),
                soldProductsList.isEmpty() ? "Sin ventas en el período" : soldProductsList,
                lowStockList.isEmpty() ? "Ninguno" : lowStockList
        );

        GroqRequestDTO request = new GroqRequestDTO(
                model,
                List.of(new GroqRequestDTO.Message("user", prompt))
        );

        GroqResponseDTO response = groqRestClient.post()
                .uri("/chat/completions")
                .body(request)
                .retrieve()
                .body(GroqResponseDTO.class);

        if (response == null || response.choices() == null || response.choices().isEmpty()) {
            throw new RuntimeException("Groq did not return a valid response");
        }

        String content = response.choices().get(0).message().content();

        try {
            JsonNode json = objectMapper.readTree(content);
            String summary = json.get("summary").asText();
            List<String> recommendations = new ArrayList<>();
            json.get("recommendations").forEach(node -> recommendations.add(node.asText()));
            return new AnalysisResponseDTO(summary, recommendations);
        } catch (Exception e) {
            return new AnalysisResponseDTO(content, List.of());
        }
    }
}
