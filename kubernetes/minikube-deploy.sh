#!/bin/bash

# CourseBotics Minikube Deployment Script (Minimal Version)
echo "🚀 Starting CourseBotics Minimal Minikube Deployment..."

# Check if minikube is available
if ! command -v minikube &> /dev/null; then
    echo "❌ minikube is not installed. Please install minikube first."
    exit 1
fi

# Check if minikube is running
if ! minikube status | grep -q "Running"; then
    echo "🔄 Starting Minikube..."
    minikube start
fi

# Get Minikube IP
MINIKUBE_IP=$(minikube ip)
echo "📝 Minikube IP: $MINIKUBE_IP"

# Apply namespace first
echo "📦 Creating namespace..."
kubectl apply -f namespace.yaml

# Apply only essential components
echo "🏗️  Deploying core application..."
kubectl apply -f deployment.yaml

# Apply Service
echo "🌐 Creating service..."
kubectl apply -f service.yaml

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/coursebotics-app -n coursebotics

# Show deployment status
echo "📊 Deployment Status:"
kubectl get all -n coursebotics

echo "✅ CourseBotics minimal deployment completed successfully!"
echo ""
echo "🌐 Your application is now available at: http://$MINIKUBE_IP:30000"
echo ""
echo "🔍 To check the status of your deployment:"
echo "kubectl get pods -n coursebotics"
echo "kubectl logs -f deployment/coursebotics-app -n coursebotics"