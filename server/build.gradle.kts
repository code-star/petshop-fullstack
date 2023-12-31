import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.1.2"
    id("io.spring.dependency-management") version "1.1.2"
    kotlin("jvm") version "1.8.22"
    kotlin("plugin.spring") version "1.8.22"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    implementation("org.springframework.boot:spring-boot-starter-security")
    testImplementation("org.springframework.security:spring-security-test:6.1.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    val testContainers = "1.18.1"
    testImplementation("org.testcontainers:testcontainers:$testContainers")
    testImplementation("org.testcontainers:mongodb:$testContainers")
    testImplementation("org.testcontainers:junit-jupiter:$testContainers")
    testImplementation("org.mockito.kotlin:mockito-kotlin:5.1.0")
    implementation("net.datafaker:datafaker:2.0.1")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
