**Plugins** > **Install Plugin**: https://raw.githubusercontent.com/jasonhazel/undash/master/undash.plg

# Unraid 6.10+
You're all set, refresh to see the UNDASH menu.

# Unraid < 6.10
You don't have plugin nchan support yet, so you'll need to start the scripts manually.  User Scripts plugin is recommended, but you could also run from the terminal, or add to your `go` file.

## Startup Script

```#!/bin/bash
/usr/local/emhttp/plugins/undash/nchan/vars > /dev/null 2>&1 &
/usr/local/emhttp/plugins/undash/nchan/disks> /dev/null 2>&1 &
/usr/local/emhttp/plugins/undash/nchan/memory > /dev/null 2>&1 &
/usr/local/emhttp/plugins/undash/nchan/docker > /dev/null 2>&1 &
/usr/local/emhttp/plugins/undash/nchan/ups> /dev/null 2>&1 &
```

### User Scripts
Add script, set too run **At First Array Start Only** and then click **Run in Background** (if you don't want to reboot the server)
