#!/bin/bash

oc project sticky-sessions

oc annotate routes sticky-sessions-app router.openshift.io/cookie_name-
oc annotate routes sticky-sessions-app haproxy.router.openshift.io/disable_cookies='true'
