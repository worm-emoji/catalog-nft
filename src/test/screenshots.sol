// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import {DSTest} from "ds-test/test.sol";
import {Utilities} from "./utils/Utilities.sol";
import {console} from "./utils/Console.sol";
import {Vm} from "forge-std/Vm.sol";
import {screenshots} from "../screenshots.sol";

contract CatTest is DSTest {
    Vm internal immutable vm = Vm(HEVM_ADDRESS);
    screenshots internal shots;
    Utilities internal utils;
    address payable[] internal users;

    function setUp() public {
        shots = new screenshots(0xD3193bc753c4aDe0E84a3f5994f16cF913A18632);
        shots.setPublicMint(true);
        utils = new Utilities();
        users = utils.createUsers(5);
    }

    function testSignature() public {
        bytes
            memory sig = hex"1762b7abad989c626f296c882be77d39b07bcb5ea4aa779fd7d2fa4732e67a96154bbd3762809a600f4204f6cafa2da808cfad5d0415b348d5808c555664db1d";

        shots.mint{value: 80000000000000000}(1557629786, sig);
    }

    function testFailMintTwice() public {
        bytes
            memory sig = hex"1762b7abad989c626f296c882be77d39b07bcb5ea4aa779fd7d2fa4732e67a96154bbd3762809a600f4204f6cafa2da808cfad5d0415b348d5808c555664db1d";
        shots.mint{value: 80000000000000000}(1557629786, sig);
        shots.mint{value: 80000000000000000}(1557629786, sig);
    }
}
