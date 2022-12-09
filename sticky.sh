#!/bin/bash

oc project sticky-sessions

oc annotate routes sticky-sessions-app router.openshift.io/cookie_name="ocpcookie"
oc annotate routes sticky-sessions-app haproxy.router.openshift.io/disable_cookies-
oc annotate routes sticky-sessions-app haproxy.router.openshift.io/balance-
