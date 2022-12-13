# OCP Sticky Sessions Demo
This is an application to demonstrate sticky sessions in OpenShift.

## Demo

1. Create everything

```shell
oc create -f ./deployment.yaml
```

2. View logs

```shell
./logs.sh
```

3. Refresh over and over and see that it's sticky and hits the same pod and also we see the `ocpcookie` that is controlling this

4. Delete cookie in browser

5. Make it unsticky

```shell
./unsticky.sh
```

6. Refresh over and over and see that it hits a different pod
