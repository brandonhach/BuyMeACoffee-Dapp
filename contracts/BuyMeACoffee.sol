// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

//This project has been deployed to Goerli testnet
//0x8574D4F5fB95BD6fa2522c32A1A646902800B47F

contract BuyMeACoffee {
    // Event to emit when a memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    //Memo Struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //List of all memos received from friends.
    Memo[] memos;

    //Address of contract deployer.
    address payable owner;

    //Deploy Logic
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffee for contract owner
     * @param _name name of the coffee buyer
     * @param _message a nice message from the coffee buyer
     */

    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        //Check value
        require(msg.value > 0, "can't buy coffee with 0 eth");

        //Add memo to storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        //Emit a log event when a new memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */

    function withdrawTips() public {
        //Strictly send to owner address no matter what
        require(owner.send(address(this).balance));
    }

    /**
     * @dev retrieve all the memos received and stored on the blockchain
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
