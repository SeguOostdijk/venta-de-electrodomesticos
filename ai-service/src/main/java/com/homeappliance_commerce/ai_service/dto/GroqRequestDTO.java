package com.homeappliance_commerce.ai_service.dto;

import java.util.List;

public record GroqRequestDTO(String model, List<Message> messages) {
    public record Message(String role, String content) {}
}
