package com.venta_de_electrodomesticos.auth_service.controller;

import com.venta_de_electrodomesticos.auth_service.dto.request.LoginRequest;
import com.venta_de_electrodomesticos.auth_service.dto.request.RefreshRequest;
import com.venta_de_electrodomesticos.auth_service.dto.request.RegisterRequest;
import com.venta_de_electrodomesticos.auth_service.dto.request.UpdateProfileRequest;
import com.venta_de_electrodomesticos.auth_service.dto.response.ApiResponse;
import com.venta_de_electrodomesticos.auth_service.dto.response.AuthResponse;
import com.venta_de_electrodomesticos.auth_service.dto.response.UserResponse;
import com.venta_de_electrodomesticos.auth_service.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse data = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", data));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse data = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", data));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshRequest request) {
        AuthResponse data = authService.refresh(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.success("Token refreshed", data));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@AuthenticationPrincipal String email) {
        authService.logout(email);
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMe(@AuthenticationPrincipal String email) {
        UserResponse data = authService.getMe(email);
        return ResponseEntity.ok(ApiResponse.success("User retrieved", data));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateMe(@AuthenticationPrincipal String email,
                                                              @Valid @RequestBody UpdateProfileRequest request) {
        UserResponse data = authService.updateMe(email, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated", data));
    }

    // Endpoints internos — solo llamados por otros microservicios via Feign
    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse data = authService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success("User retrieved", data));
    }

}
