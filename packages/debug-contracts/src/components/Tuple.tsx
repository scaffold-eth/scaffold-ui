import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInput } from "./ContractInput";
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
    <div>
      <div tabIndex={0} className="collapse collapse-arrow bg-base-200 pl-4 py-1.5 border-2 border-secondary">
        <input type="checkbox" className="min-h-fit! peer" />
        <div className="collapse-title after:top-3.5! p-0 min-h-fit! peer-checked:mb-2 text-primary-content/50">
          <p className="m-0 p-0 text-[1rem]">{abiTupleParameter.internalType}</p>
        </div>
        <div className="ml-3 flex-col space-y-4 border-secondary/80 border-l-2 pl-4 collapse-content">
          {abiTupleParameter?.components?.map((param: any, index: any) => {
            const key = getFunctionInputKey(abiTupleParameter.name || "tuple", param, index);
            return <ContractInput setForm={setForm} form={form} key={key} stateObjectKey={key} paramType={param} />;
          })}
        </div>
      </div>
    </div>
  );
};
