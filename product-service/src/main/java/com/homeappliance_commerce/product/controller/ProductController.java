package com.homeappliance_commerce.product.controller;

import com.homeappliance_commerce.product.exception.ErrorResponse;
import com.homeappliance_commerce.product.model.Product;
import com.homeappliance_commerce.product.service.IProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@Tag(name = "Productos", description = "Operaciones CRUD para la gestion de productos")
public class ProductController {

    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Obtener producto por ID",
            description = "Devuelve un producto existente a partir de su identificador unico",
            operationId = "findProductById"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto encontrado",
                    content = @Content(schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Product> findById(
            @Parameter(description = "ID del producto", example = "1", required = true)
            @PathVariable("id") Long id) {
        Product product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    @Operation(
            summary = "Obtener productos por lista de IDs",
            description = "Devuelve una lista de productos segun los IDs enviados por query param",
            operationId = "findProductsByIds"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Productos recuperados correctamente",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Product.class)))),
            @ApiResponse(responseCode = "400", description = "Solicitud invalida",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<List<Product>> findAllByIds(
            @Parameter(description = "Lista de IDs de productos", example = "1,2,3", required = true)
            @RequestParam("ids") List<Long> ids) {
        List<Product> products = productService.findAllById(ids);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    @Operation(
            summary = "Crear producto",
            description = "Crea un nuevo producto y devuelve el recurso persistido",
            operationId = "createProduct"
    )
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Datos del producto a crear",
            required = true,
            content = @Content(schema = @Schema(implementation = Product.class))
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Producto creado",
                    content = @Content(schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada invalidos",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Product> save(@RequestBody Product product) {
        Product savedProduct = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @PutMapping
    @Operation(
            summary = "Actualizar producto",
            description = "Actualiza los datos de un producto existente",
            operationId = "updateProduct"
    )
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Nuevos datos del producto",
            required = true,
            content = @Content(schema = @Schema(implementation = Product.class))
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto actualizado",
                    content = @Content(schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "400", description = "Solicitud invalida",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Product> edit(
            @Parameter(description = "ID del producto a actualizar", example = "1", required = true)
            @RequestParam("id") Long id,
            @RequestBody Product product) {
        Product updatedProduct = productService.edit(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping
    @Operation(
            summary = "Eliminar producto",
            description = "Elimina un producto por su ID y devuelve el recurso eliminado",
            operationId = "deleteProductById"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto eliminado",
                    content = @Content(schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "400", description = "Solicitud invalida",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Product> deleteById(
            @Parameter(description = "ID del producto a eliminar", example = "1", required = true)
            @RequestParam("id") Long id) {
        Product deletedProduct = productService.deleteById(id);
        return ResponseEntity.ok(deletedProduct);
    }
}
