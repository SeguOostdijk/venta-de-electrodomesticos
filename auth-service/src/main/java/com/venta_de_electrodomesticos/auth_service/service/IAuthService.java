package com.venta_de_electrodomesticos.auth_service.service;

import com.venta_de_electrodomesticos.auth_service.dto.request.LoginRequest;
import com.venta_de_electrodomesticos.auth_service.dto.request.RegisterRequest;
import com.venta_de_electrodomesticos.auth_service.dto.request.UpdateProfileRequest;
import com.venta_de_electrodomesticos.auth_service.dto.response.AuthResponse;
import com.venta_de_electrodomesticos.auth_service.dto.response.UserResponse;

public interface IAuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refresh(String rawRefreshToken);

    void logout(String email);

    UserResponse getMe(String email);

    UserResponse getUserById(Long id);

    UserResponse updateMe(String email, UpdateProfileRequest request);
}
