#!/bin/bash

# CourseBotics Kubernetes Deployment Script
echo "🚀 Starting CourseBotics Kubernetes Deployment..."

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Apply namespace first
echo "📦 Creating namespace..."
kubectl apply -f namespace.yaml

# Apply RBAC
echo "🔐 Setting up RBAC..."
kubectl apply -f rbac.yaml

# Apply ConfigMap and Secrets
echo "⚙️  Applying configuration..."
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# Apply Deployment
echo "🏗️  Deploying application..."
kubectl apply -f deployment.yaml

# Apply Service
echo "🌐 Creating service..."
kubectl apply -f service.yaml

# Apply Ingress
echo "🔗 Setting up ingress..."
kubectl apply -f ingress.yaml

# Apply HPA
echo "📈 Setting up auto-scaling..."
kubectl apply -f hpa.yaml

# Apply PDB
echo "🛡️  Setting up pod disruption budget..."
kubectl apply -f pdb.yaml

# Apply Network Policy
echo "🔒 Applying network policies..."
kubectl apply -f network-policy.yaml

# Apply Monitoring (optional)
echo "📊 Setting up monitoring..."
kubectl apply -f monitoring.yaml

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/coursebotics-app -n coursebotics

# Show deployment status
echo "📊 Deployment Status:"
kubectl get all -n coursebotics

echo "✅ CourseBotics deployment completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Update the secret.yaml file with your actual environment variables"
echo "2. Update the ingress.yaml file with your actual domain name"
echo "3. Make sure you have an ingress controller installed (nginx-ingress)"
echo "4. Make sure you have cert-manager installed for SSL certificates"
echo ""
echo "🔍 To check the status of your deployment:"
echo "kubectl get pods -n coursebotics"
echo "kubectl logs -f deployment/coursebotics-app -n coursebotics"