package main

import (
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
)

func main() {
	privateKey, err := crypto.HexToECDSA("")
	if err != nil {
		log.Fatal(err)
	}

	addr := crypto.PubkeyToAddress(privateKey.PublicKey)
	println("address:")
	println(addr.Hex())
	id := big.NewInt(1579119583)
	uint256Ty, _ := abi.NewType("uint256", "uint256", []abi.ArgumentMarshaling{})
	arguments := abi.Arguments{{Type: uint256Ty}}

	toSign, _ := arguments.Pack(id)

	hash := crypto.Keccak256Hash(toSign)
	println("hash:")
	fmt.Println(hash.Hex())

	println("signature: ")

	signature, err := crypto.Sign(hash.Bytes(), privateKey)
	if err != nil {
		log.Fatal(err)
	}

	if signature[64] == 0 || signature[64] == 1 {
		signature[64] += 27
	}

	signature = signature[:len(signature)-1] // remove recovery ID
	fmt.Println(hexutil.Encode(signature))
}
