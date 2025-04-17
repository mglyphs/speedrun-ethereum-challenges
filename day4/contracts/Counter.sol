// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Counter {
    uint256 public count;
    address public bro;

    constructor(uint256 _initialCount) {
        count = _initialCount;
        bro = msg.sender;
    }

    modifier onlyBro() {
        require(msg.sender == bro, "Sorry, not the bro");

        //placeholder for the function that is being called
        _;
    }

    // Function to get the current count
    function get() public view returns (uint256) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    function superInc() public onlyBro {
        count += 10;
    }

    // Function to decrement count by 1
    function dec() public onlyBro {
        // This function will fail if count = 0
        count -= 1;
    }
}