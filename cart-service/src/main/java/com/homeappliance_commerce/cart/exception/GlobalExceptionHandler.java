package com.homeappliance_commerce.cart.exception;

import com.homeappliance_commerce.cart.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CartNotFoundException.class)
    public ResponseEntity<ApiError> handleCartNotFound(CartNotFoundException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiError> handleProductNotFound(ProductNotFoundException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ServiceUnavailableException.class)
    public ResponseEntity<ApiError> handleServiceUnavailable(ServiceUnavailableException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception ex) {
        return buildErrorResponse("Error interno del servidor: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ApiError> buildErrorResponse(String message, HttpStatus status) {
        ApiError body = new ApiError(
                LocalDateTime.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                message
        );
        return new ResponseEntity<>(body, status);
    }
}
