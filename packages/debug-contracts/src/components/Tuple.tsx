import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInput } from "./ContractInput";
import { Collapsible } from "./Collapsible";
import { AbiParameterTuple, getFunctionInputKey, getInitialTupleFormState } from "../utils/contracts";
import { replacer } from "../utils/utilsDisplay";

type TupleProps = {
  abiTupleParameter: AbiParameterTuple;
  setParentForm: Dispatch<SetStateAction<Record<string, any>>>;
  parentStateObjectKey: string;
  parentForm: Record<string, any> | undefined;
};

export const Tuple = ({ abiTupleParameter, setParentForm, parentStateObjectKey }: TupleProps) => {
  const [form, setForm] = useState<Record<string, any>>(() => getInitialTupleFormState(abiTupleParameter));

  useEffect(() => {
    const values = Object.values(form);
    const argsStruct: Record<string, any> = {};
    abiTupleParameter.components.forEach((component: any, componentIndex: any) => {
      argsStruct[component.name || `input_${componentIndex}_`] = values[componentIndex];
    });

    setParentForm((parentForm) => ({ ...parentForm, [parentStateObjectKey]: JSON.stringify(argsStruct, replacer) }));
  }, [JSON.stringify(form, replacer)]);

  return (
    <Collapsible title={abiTupleParameter.internalType || "tuple"}>
      <div className="flex flex-col space-y-4 border-l-2 border-sui-primary-subtle/80 pl-4 ml-3">
        {abiTupleParameter?.components?.map((param: any, index: any) => {
          const key = getFunctionInputKey(abiTupleParameter.name || "tuple", param, index);
          return (
            <ContractInput
              setForm={setForm}
              form={form}
              key={key}
              stateObjectKey={key}
              paramType={param}
            />
          );
        })}
      </div>
    </Collapsible>
  );
};
