package com.rollwrite.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.*;

@Configuration
@EnableOpenApi
public class SwaggerConfig {

    private static final String REFERENCE = "Bearer ";

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("RollWrite API")
            .description("RollWrite API Document")
            .version("1.0")
            .build();
    }

    private Set<String> consumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        return consumes;
    }

    private Set<String> produceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        produces.add("image/png");
        return produces;
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
            .securityReferences(defaultAuth())
            .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = new AuthorizationScope("global", "accessEverything");
        return List.of(new SecurityReference(REFERENCE, authorizationScopes));
    }

    // Authorization : Bearer 추가
    private HttpAuthenticationScheme bearerAuthSecuritySchema() {
        return HttpAuthenticationScheme.JWT_BEARER_BUILDER
                .name(REFERENCE)
                .build();
    }

    @Bean
    public Docket api() {
        Server serverLocal = new Server("local server", "http://localhost:8081", "for local usages",
            Collections.emptyList(), Collections.emptyList());
        Server testServer = new Server("deploy server", "https://k8a508.p.ssafy.io",
            "for deploy server", Collections.emptyList(), Collections.emptyList());
        return new Docket(DocumentationType.OAS_30)
                .servers(serverLocal, testServer)
                .securityContexts(List.of(securityContext()))
                .securitySchemes(List.of(bearerAuthSecuritySchema()))
                .consumes(consumeContentTypes())
                .produces(produceContentTypes())
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.rollwrite"))
                .paths(PathSelectors.any())
                .build();
    }
}