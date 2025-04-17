pragma solidity 0.8.20; //Do not change the solidity version as it negatively impacts submission grading
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "./YourToken.sol";
import "hardhat/console.sol";

contract Vendor is Ownable{
    YourToken public yourToken;
    uint256 public constant tokensPerEth = 100;

    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);


    constructor(address tokenAddress) Ownable(msg.sender){
        yourToken = YourToken(tokenAddress);
    }

    // ToDo: create a payable buyTokens() function:
    function buyTokens() public payable {
        console.log("msg value: %s", msg.value);
        uint256 amountOfTokens =  msg.value * tokensPerEth;
        yourToken.transfer(msg.sender, amountOfTokens);

        emit BuyTokens(msg.sender, msg.value, amountOfTokens);
    }

    // ToDo: create a withdraw() function that lets the owner withdraw ETH

    function withdraw() public onlyOwner {
        // Note: address.call() only used for ETH
        // yourToken.transfer(msg.sender, yourToken.balanceOf(address(this)));

        (bool good, ) = msg.sender.call{value: address(this).balance}("");

        require(good, "Not good");

    }

    // ToDo: create a sellTokens(uint256 _amount) function:
    function sellTokens(uint256 amount) public {
        yourToken.transferFrom(msg.sender, address(this), amount);

        console.log("tokens: %s", amount);
        uint256 ethAmount = amount/tokensPerEth;
        console.log("Eth amount: %s", ethAmount);
        (bool good, ) = msg.sender.call{value: ethAmount}("");

        require(good, "Not good");
    }
}
