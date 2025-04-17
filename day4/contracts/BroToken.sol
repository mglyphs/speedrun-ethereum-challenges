// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BroToken {
    uint256 public constant totalSupply = 1000;
    uint256 public totalCreated = 0;

    uint256 public constant CREATION_PRICE = 0.01 ether;

    // Making this immutable saves gas (bro will not change)
    address public immutable bro;

    mapping(address => uint256) public balances;

    constructor () {
        bro = msg.sender;
    }
    modifier onlyBro() {
        require(msg.sender == bro, "Sorry, not the bro");
        _;
    }

    function create(uint256 quantity) public onlyBro {
        require(quantity + totalCreated <= totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;

    }

    function send(address to, uint256 quantity) public {
        require(balances[msg.sender] >= quantity, "You don't have enough");
        
        balances[msg.sender] -= quantity;
        balances[to] += quantity;

    }

    function buy() public payable {
        require(msg.value == CREATION_PRICE, "Incorrect ETH amount");
        require(totalCreated < totalSupply, "TotalSupply reached!");

        balances[msg.sender] += 1;
        totalCreated += 1;
    }

}