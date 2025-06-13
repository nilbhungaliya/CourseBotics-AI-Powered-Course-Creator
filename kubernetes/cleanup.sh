#!/bin/bash

# CourseBotics Kubernetes Cleanup Script (Minimal Version)
echo "🧹 Starting CourseBotics Minimal Kubernetes Cleanup..."

# Delete only the resources we deployed
echo "🗑️  Deleting core resources..."
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml

# Delete the namespace (this will also delete any remaining resources)
echo "📦 Deleting namespace..."
kubectl delete -f namespace.yaml

echo "✅ CourseBotics minimal cleanup completed successfully!"