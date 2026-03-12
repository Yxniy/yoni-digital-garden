---
title: Incident Debugging Playbook
description: My repeatable process for debugging service outages and latency spikes.
pubDate: 2026-03-05
tags: [incident-response, debugging, reliability]
category: Networking Research
---

When production behavior is unknown, use a repeatable playbook:

- Confirm blast radius and customer impact.
- Validate recent deploys and configuration changes.
- Check service health, logs, and request latency.
- Isolate by layer: DNS, network path, transport, app.
- Record findings and update runbooks after resolution.

The goal is not just to fix incidents but to reduce time-to-resolution for the next one.
