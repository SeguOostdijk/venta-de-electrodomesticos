package com.homeappliance_commerce.ai_service.controller;

import com.homeappliance_commerce.ai_service.dto.AnalysisRequestDTO;
import com.homeappliance_commerce.ai_service.dto.AnalysisResponseDTO;
import com.homeappliance_commerce.ai_service.service.IAiAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {

    private final IAiAnalysisService aiAnalysisService;

    @PostMapping("/analysis")
    public ResponseEntity<AnalysisResponseDTO> generateAnalysis(@RequestBody AnalysisRequestDTO request) {
        return ResponseEntity.ok(aiAnalysisService.generateAnalysis(request.getPeriod()));
    }
}
