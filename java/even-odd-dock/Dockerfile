FROM openjdk:17-slim AS builder
WORKDIR /app
COPY . .
RUN javac Main.java
FROM gcr.io/distroless/java17-debian13
WORKDIR /app
COPY --from=builder /app/Main.class /app/
CMD ["Main"]