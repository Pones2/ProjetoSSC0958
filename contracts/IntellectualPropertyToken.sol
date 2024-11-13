// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IntellectualPropertyToken {
    string public name = "IP Token";
    string public symbol = "IPT";
    uint256 public totalSupply;
    address public owner;

    struct IntellectualProperty {
        uint256 id;
        string name;
        address owner;
    }

    mapping(address => uint256) public balanceOf;
    mapping(uint256 => IntellectualProperty) public intellectualProperties;
    uint256 public nextAssetId;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event AssetRegistered(
        uint256 indexed assetId,
        string name,
        address indexed owner
    );
    event AssetTransferred(
        uint256 indexed assetId,
        address indexed from,
        address indexed to
    );

    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply;
        balanceOf[owner] = _initialSupply;
        nextAssetId = 1;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Saldo insuficiente");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function registerAsset(string memory _name) public {
        uint256 assetId = nextAssetId;
        intellectualProperties[assetId] = IntellectualProperty(
            assetId,
            _name,
            msg.sender
        );
        nextAssetId++;
        emit AssetRegistered(assetId, _name, msg.sender);
    }

    function transferAsset(uint256 _assetId, address _newOwner) public {
        IntellectualProperty storage asset = intellectualProperties[_assetId];
        require(
            asset.owner == msg.sender,
            "Apenas o proprietario atual pode transferir o ativo"
        );
        asset.owner = _newOwner;
        emit AssetTransferred(_assetId, msg.sender, _newOwner);
    }
}
