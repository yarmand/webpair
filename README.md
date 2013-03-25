WebPair is an attempt to make pairing easy by sharing a tmux session through a web browser.

You will use a tmux session on your local machine that can be shared to
other users on your machine. Then You'l open a ssh connection to a bridge
server in the cloud where your pair buddies will be able to connect with
their web browser.

**WARNING**: This is a full personna sharing that mean you and your pair
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

# Usage

1. create a shared tmux session with a server socket

    ```sh
    bin/stmux
    ```

1. lunch the share script

    ```sh
    bin/stmux share
    ```

1. share the resulting link with your friend

1. shutdown the connection when your are done by hitting ^C.

# installation
## setup your local machine

## setup on remote bridge

# configuration


