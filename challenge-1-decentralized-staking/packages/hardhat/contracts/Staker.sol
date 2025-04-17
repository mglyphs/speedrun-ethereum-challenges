// SPDX-License-Identifier: MIT
pragma solidity 0.8.20; //Do not change the solidity version as it negatively impacts submission grading

import "hardhat/console.sol";
import "./ExampleExternalContract.sol";

contract Staker {
    ExampleExternalContract public exampleExternalContract;
    event Stake(address sender, uint256 amount);

    mapping(address => uint256) public balances;
    uint256 public constant threshold = 1 ether;

    uint256 public deadline = block.timestamp + 30 seconds;
    bool public openForWithdraw = false;
    bool public allowingDeposit = true;

    constructor(address exampleExternalContractAddress) {
        exampleExternalContract = ExampleExternalContract(exampleExternalContractAddress);
    }

    modifier contractComplete() {
        require(!exampleExternalContract.completed(), "Funds already transferred to contract");
        _;
    }

    receive() external payable contractComplete {
        this.stake{value: msg.value}();
    }

    // Collect funds in a payable `stake()` function and track individual `balances` with a mapping:
    // (Make sure to add a `Stake(address,uint256)` event and emit it for the frontend `All Stakings` tab to display)

    function stake() public payable {
            balances[msg.sender] += msg.value;
            emit Stake(msg.sender, msg.value);
    }

    // After some `deadline` allow anyone to call an `execute()` function
    // If the deadline has passed and the threshold is met, it should call `exampleExternalContract.complete{value: address(this).balance}()`

    function execute() public contractComplete {
        if (this.timeLeft() == 0) {
            if (address(this).balance >= 1 ether)
                exampleExternalContract.complete{value: address(this).balance}();
            else
                openForWithdraw = true;
        }

    }
    // If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance
    function withdraw() public contractComplete {
        if (openForWithdraw)
        {
            uint256 balance = balances[msg.sender];
            (bool success, ) = msg.sender.call{value: balance}("");
            require(success, "Failed to withdraw Ether");
        }
    }

    // Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
    function timeLeft() public view returns (uint256) {
        if (block.timestamp >= deadline)
            return 0;
        else
            return deadline - block.timestamp;
    }

    // Add the `receive()` special function that receives eth and calls stake()
}
