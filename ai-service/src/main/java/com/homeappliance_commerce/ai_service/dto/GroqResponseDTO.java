package com.homeappliance_commerce.ai_service.dto;

import java.util.List;

public record GroqResponseDTO(List<Choice> choices) {
    public record Choice(Message message) {}
    public record Message(String content) {}
}
