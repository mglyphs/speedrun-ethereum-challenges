// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
// import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    uint256 public counter = 8;
    bool public unlocked = false;

    constructor(string memory _greeting) {
        // console.log("Deploying a greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        // This is an assert statement
        require(unlocked, "Sorry this is locked!");

        // console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function toggleUnlocked() public {
        unlocked = !unlocked;
    }
}