export const deployedContracts = {
  11155111: {
    YourContract: {
      address: "0xBf6D6faFE5B0C009E5447A27A94E093F490Dd0FC",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "greetingSetter",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "newGreeting",
              type: "string",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "premium",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "GreetingChange",
          type: "event",
        },
        {
          inputs: [],
          name: "geAllSData",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "a",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.SimpleStruct[][][]",
                  name: "b",
                  type: "tuple[][][]",
                },
              ],
              internalType: "struct YourContract.NestedStruct",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "greeting",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "premium",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "sData",
          outputs: [
            {
              internalType: "uint256",
              name: "a",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newGreeting",
              type: "string",
            },
          ],
          name: "setGreeting",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "tData",
          outputs: [
            {
              internalType: "uint256",
              name: "x",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "y",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "a",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.SimpleStruct[][][]",
                  name: "b",
                  type: "tuple[][][]",
                },
              ],
              internalType: "struct YourContract.NestedStruct",
              name: "_nestedStruct",
              type: "tuple",
            },
          ],
          name: "totalPassedStruct",
          outputs: [
            {
              internalType: "uint256",
              name: "totalA",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "totalX",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "totalY",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "a",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "x",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "y",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.SimpleStruct[][][]",
                  name: "b",
                  type: "tuple[][][]",
                },
              ],
              internalType: "struct YourContract.NestedStruct",
              name: "_nestedStruct",
              type: "tuple",
            },
          ],
          name: "updateData",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "userGreetingCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "valueData",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
      deployedOnBlock: 9123889,
    },
  },
} as const;
