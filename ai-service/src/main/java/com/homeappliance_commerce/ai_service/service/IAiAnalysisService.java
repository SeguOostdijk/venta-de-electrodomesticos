package com.homeappliance_commerce.ai_service.service;

import com.homeappliance_commerce.ai_service.dto.AnalysisResponseDTO;

public interface IAiAnalysisService {
    AnalysisResponseDTO generateAnalysis(String period);
}
