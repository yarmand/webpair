# !!! Project not supported anymore!!!
## have a look at tmate: https://github.com/tmate-io/tmate

---

Webpair is an attempt to make pairing easy by sharing a tmux session through a web browser.

You will use a tmux session on your local machine that can be shared to
other users on your machine. Then You'l open a ssh connection to a bridge
server in the cloud where your pair buddies will be able to connect with
their web browser.

WARNING: This is a full personna sharing that mean you and your pair
will be the same user on your machine for the duration of the
connection.
The purpose of this tools IS NOT to keep the connection opened
permanently. Close it when your pair session is finished.

# Requirements

* a machine in the cloud where:
  * you can ssh to
  * git is installed
  * nodeJS is installed
* a local account to be used to join your tmux session
* ruby on your local machine

# Usage

1. create a shared tmux session with a server socket
    ```
      bin/stmux
    ```
1. lunch the share script
    ```
      bin/stmux share
    ```
1. share the resulting link with your friend

1. shutdown the connection when your are done by hitting ^C.

# How does it work

<code><pre>
 (your tmux session) <>------           -
                            |            |
                   tmux socket share     | your machine
                            |            |
 |--<>(local pair user) <>--|            |
 |                                      -
SSH
 |                                      -
 --< (remote bridge) <>-----|             | your remote server
                            |           -
                          HTTP(S)
                            |           -
     (remote pair user) <>--|             | pair user machine
                                        -
</pre></code>

1. stmux create a shared tmux session using a socket. Any local user can
   connect to it
1. webpair open a ssh connection to your remote bridge with a come back
   route from a random port to your local machine port 22 (ssh). This
   back route can only be used by a logged user on the remote bridge
   machine.
1. a tty.js server is launched o nthe bridge, attaching a random string
   to the back route port.
1. when a remote pair use the URL of the bridge including the random
   string. tty.js establish a local SSH connection to the back route
   port.

# installation

## setup your local machine
We want to create a local user which will automatically connect to the
default stmux shared session at login.

1. create a new user

    ``` sh
    # Linux
    useradd ....
    # OSX
    ps...
    ```

1. make this user connect toe the default stmux socket
    ```
    cat > ~pguest/.bashrc <<EOF
    tmux -S /tmp/tmux-pair attach
    exit
    EOF
    ```

## setup on remote bridge
### standalone server
Your local machine will establish a SSH connection to your remote
bridge. You need a remote user to ssh to.

1. checkout this repository as a folder named
```webpair``` at the root of your remote user home directory.

  ```
  ssh my_remote_user@remote.bridge git clone http://github.com/yarmand/webpair.git
  ```

1. install our patched tty.js and its dependencies in our node subsystem.

  ```
  local>ssh my_remote_user@remote.bridge
  remote>cd webpair/tty.js
  remote>npm intall
  ```

** optionnal **
To avoid password asking and speedup connection time, you can setup ssh
keys between your remote bridge and your local machine.
### behind a webserver (ngynx)
__ to be done __

# configuration
you can setup a YML configuration file ```~/.webpair or ./.webpair```

Here is an example:

  ```
  server: my.remote.bridge
  remote_user: my_remote_user
  remote_port: 8000
  local_guest_user: pguest
  use_https: true
  TMUX_OPTS: -2
  ```

__ TMUX_OPTS __ are complementary tmux command line options when creating a session.

