package com.homeappliance_commerce.ai_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AnalysisResponseDTO {
    private String summary;
    private List<String> recommendations;
}
