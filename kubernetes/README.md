# CourseBotics Kubernetes Deployment

This directory contains all the Kubernetes manifests and scripts needed to deploy the CourseBotics application to a Kubernetes cluster.

## 📁 Files Overview

- `namespace.yaml` - Creates the `coursebotics` namespace
- `secret.yaml` - Contains sensitive environment variables
- `configmap.yaml` - Contains non-sensitive configuration
- `rbac.yaml` - Service Account and RBAC configuration
- `deployment.yaml` - Main application deployment
- `service.yaml` - Service to expose the application internally
- `ingress.yaml` - Ingress for external access
- `hpa.yaml` - Horizontal Pod Autoscaler for auto-scaling
- `pdb.yaml` - Pod Disruption Budget for high availability
- `network-policy.yaml` - Network security policies
- `monitoring.yaml` - Monitoring setup for Prometheus
- `deploy.sh` - Deployment script
- `cleanup.sh` - Cleanup script

## 🚀 Quick Deployment

### Prerequisites

1. **Kubernetes Cluster**: Ensure you have access to a Kubernetes cluster
2. **kubectl**: Install and configure kubectl
3. **Ingress Controller**: Install nginx-ingress controller
4. **Cert Manager**: Install cert-manager for SSL certificates (optional)

### Step 1: Update Configuration

1. **Update Secrets**: Edit `secret.yaml` and replace placeholder values with your actual environment variables:
   ```yaml
   DATABASE_URL: "your-actual-database-url"
   NEXT_PUBLIC_GEMINI_API_KEY: "your-actual-gemini-api-key"
   # ... update all other values
   ```

2. **Update Domain**: Edit `ingress.yaml` and replace `coursebotics.yourdomain.com` with your actual domain.

3. **Update Docker Image**: Edit `deployment.yaml` and update the image name if needed:
   ```yaml
   image: nilbhungaliya11/coursebotics:latest
   ```

### Step 2: Deploy

```bash
# Navigate to kubernetes directory
cd kubernetes

# Make the deploy script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

### Step 3: Verify Deployment

```bash
# Check all resources
kubectl get all -n coursebotics

# Check pod logs
kubectl logs -f deployment/coursebotics-app -n coursebotics

# Check ingress
kubectl get ingress -n coursebotics

# Check HPA status
kubectl get hpa -n coursebotics
```

## 🔧 Manual Deployment

If you prefer to deploy manually:

```bash
# Navigate to kubernetes directory
cd kubernetes

# Apply in order
kubectl apply -f namespace.yaml
kubectl apply -f rbac.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
kubectl apply -f pdb.yaml
kubectl apply -f network-policy.yaml
kubectl apply -f monitoring.yaml
```

## 📊 Monitoring and Scaling

### Auto-scaling Configuration
The HPA is configured to:
- **Minimum replicas**: 3
- **Maximum replicas**: 10
- **Scale based on**: CPU (70%) and Memory (80%) usage

### Resource Limits
Each pod is configured with:
- **Requests**: 250m CPU, 512Mi memory
- **Limits**: 500m CPU, 1Gi memory

### Health Checks
- **Liveness Probe**: Checks if the application is running (path: `/`)
- **Readiness Probe**: Checks if the application is ready to serve traffic (path: `/`)

### Monitoring
If you have Prometheus installed, the ServiceMonitor will automatically scrape metrics from `/api/health`.

## 🛡️ Security Features

- **Network Policies**: Restrict network traffic to only necessary connections
- **RBAC**: Least privilege access with dedicated service account
- **Pod Security**: Resource limits and health checks
- **Secrets Management**: Sensitive data stored in Kubernetes secrets
- **Pod Disruption Budget**: Ensures high availability during updates

## 🔍 Troubleshooting

### Check Pod Status
```bash
kubectl get pods -n coursebotics
kubectl describe pod <pod-name> -n coursebotics
```

### Check Logs
```bash
# Follow logs from all pods
kubectl logs -f deployment/coursebotics-app -n coursebotics

# Get logs from specific pod
kubectl logs <pod-name> -n coursebotics
```

### Check Events
```bash
kubectl get events -n coursebotics --sort-by='.lastTimestamp'
```

### Check Ingress
```bash
kubectl describe ingress coursebotics-ingress -n coursebotics
```

### Check HPA Status
```bash
kubectl describe hpa coursebotics-hpa -n coursebotics
```

### Common Issues

1. **Pods not starting**: Check resource availability and image pull status
2. **Ingress not working**: Verify ingress controller is installed and domain is configured
3. **Database connection issues**: Check DATABASE_URL in secrets
4. **SSL certificate issues**: Ensure cert-manager is installed and configured

## 🧹 Cleanup

To remove all resources:

```bash
# Navigate to kubernetes directory
cd kubernetes

# Make cleanup script executable
chmod +x cleanup.sh

# Run cleanup
./cleanup.sh
```

## 📝 Configuration Details

### Environment Variables
All environment variables are managed through:
- **ConfigMap**: Non-sensitive configuration (NODE_ENV, PORT)
- **Secret**: Sensitive data (API keys, database URLs, etc.)

### Networking
- **Service**: ClusterIP service exposing port 80 internally
- **Ingress**: External access with SSL termination
- **Network Policy**: Restricts traffic to ingress controller and internal pods

## 🌐 Accessing the Application

Once deployed, the application will be available at:
- **Internal**: `http://coursebotics-service.coursebotics.svc.cluster.local`
- **External**: `https://coursebotics.yourdomain.com` (after configuring ingress)

## 📈 Scaling Operations

### Manual Scaling
```bash
# Scale to specific number of replicas
kubectl scale deployment coursebotics-app --replicas=5 -n coursebotics

# Check current scale
kubectl get deployment coursebotics-app -n coursebotics
```

### Auto Scaling
The HPA will automatically scale based on CPU and memory usage. Monitor with:
```bash
kubectl get hpa -n coursebotics -w
```

## 🔄 Updates and Rollbacks

### Rolling Updates
```bash
# Update image
kubectl set image deployment/coursebotics-app coursebotics=nilbhungaliya11/coursebotics:v2.0 -n coursebotics

# Check rollout status
kubectl rollout status deployment/coursebotics-app -n coursebotics
```

### Rollbacks
```bash
# Check rollout history
kubectl rollout history deployment/coursebotics-app -n coursebotics

# Rollback to previous version
kubectl rollout undo deployment/coursebotics-app -n coursebotics
```

## 🔧 Customization

### Adjusting Resources
Edit `deployment.yaml` to modify resource requests and limits:
```yaml
resources:
  requests:
    memory: "1Gi"      # Increase memory request
    cpu: "500m"        # Increase CPU request
  limits:
    memory: "2Gi"      # Increase memory limit
    cpu: "1000m"       # Increase CPU limit
```

### Adjusting Scaling
Edit `hpa.yaml` to modify auto-scaling behavior:
```yaml
spec:
  minReplicas: 5       # Increase minimum replicas
  maxReplicas: 20      # Increase maximum replicas
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50  # Scale at lower CPU usage
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Kubernetes events and logs
3. Ensure all prerequisites are met
4. Verify configuration values in secrets and configmaps
5. Check that your Kubernetes cluster has sufficient resources

## 📋 Deployment Checklist

Before deploying, ensure:
- [ ] Kubernetes cluster is accessible
- [ ] kubectl is configured
- [ ] Ingress controller is installed
- [ ] All secrets are updated with actual values
- [ ] Domain name is configured in ingress
- [ ] Docker image is built and pushed to registry
- [ ] Database is accessible from the cluster
- [ ] Required external services (Cloudinary, etc.) are configured