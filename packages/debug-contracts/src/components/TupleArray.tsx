import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInput } from "./ContractInput";
import { Collapsible } from "./Collapsible";
import { AbiParameterTuple, getFunctionInputKey, getInitialTupleArrayFormState } from "../utils/contracts";
import { replacer } from "../utils/utilsDisplay";

type TupleArrayProps = {
  abiTupleParameter: AbiParameterTuple & { isVirtual?: true };
  setParentForm: Dispatch<SetStateAction<Record<string, any>>>;
  parentStateObjectKey: string;
  parentForm: Record<string, any> | undefined;
};

export const TupleArray = ({ abiTupleParameter, setParentForm, parentStateObjectKey }: TupleArrayProps) => {
  const [form, setForm] = useState<Record<string, any>>(() => getInitialTupleArrayFormState(abiTupleParameter));
  const [additionalInputs, setAdditionalInputs] = useState<Array<typeof abiTupleParameter.components>>([
    abiTupleParameter.components,
  ]);

  const depth = (abiTupleParameter.type.match(/\[\]/g) || []).length;

  useEffect(() => {
    // Extract and group fields based on index prefix
    const groupedFields = Object.keys(form).reduce(
      (acc, key) => {
        const [indexPrefix, ...restArray] = key.split("_");
        const componentName = restArray.join("_");
        if (!acc[indexPrefix]) {
          acc[indexPrefix] = {};
        }
        acc[indexPrefix][componentName] = form[key];
        return acc;
      },
      {} as Record<string, Record<string, any>>,
    );

    let argsArray: Array<Record<string, any>> = [];

    Object.keys(groupedFields).forEach((key) => {
      const currentKeyValues = Object.values(groupedFields[key]);

      const argsStruct: Record<string, any> = {};
      abiTupleParameter.components.forEach((component: any, componentIndex: any) => {
        argsStruct[component.name || `input_${componentIndex}_`] = currentKeyValues[componentIndex];
      });

      argsArray.push(argsStruct);
    });

    if (depth > 1) {
      argsArray = argsArray.map((args) => {
        return args[abiTupleParameter.components[0].name || "tuple"];
      });
    }

    setParentForm((parentForm) => {
      return { ...parentForm, [parentStateObjectKey]: JSON.stringify(argsArray, replacer) };
    });
  }, [JSON.stringify(form, replacer)]);

  const addInput = () => {
    setAdditionalInputs((previousValue) => {
      const newAdditionalInputs = [...previousValue, abiTupleParameter.components];

      // Add the new inputs to the form
      setForm((form) => {
        const newForm = { ...form };
        abiTupleParameter.components.forEach((component: any, componentIndex: any) => {
          const key = getFunctionInputKey(
            `${newAdditionalInputs.length - 1}_${abiTupleParameter.name || "tuple"}`,
            component,
            componentIndex,
          );
          newForm[key] = "";
        });
        return newForm;
      });

      return newAdditionalInputs;
    });
  };

  const removeInput = () => {
    // Remove the last inputs from the form
    setForm((form) => {
      const newForm = { ...form };
      abiTupleParameter.components.forEach((component: any, componentIndex: any) => {
        const key = getFunctionInputKey(
          `${additionalInputs.length - 1}_${abiTupleParameter.name || "tuple"}`,
          component,
          componentIndex,
        );
        delete newForm[key];
      });
      return newForm;
    });
    setAdditionalInputs((inputs) => inputs.slice(0, -1));
  };

  return (
    <Collapsible title={abiTupleParameter.internalType || "tuple-array"}>
      <div className="ml-3 flex flex-col space-y-2 border-l-2 border-sui-primary-subtle/70 pl-4">
        {additionalInputs.map((additionalInput, additionalIndex) => (
          <div
            key={additionalIndex}
            className="space-y-1"
          >
            <span className="inline-block bg-sui-primary-subtle text-sui-primary-content text-xs px-2 py-1 rounded">
              {depth > 1 ? `${additionalIndex}` : `tuple[${additionalIndex}]`}
            </span>
            <div className="space-y-4">
              {additionalInput.map((param: any, index: any) => {
                const key = getFunctionInputKey(
                  `${additionalIndex}_${abiTupleParameter.name || "tuple"}`,
                  param,
                  index,
                );
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
          </div>
        ))}
        <div className="flex space-x-2">
          <button
            className="btn-dc btn-dc-secondary min-h-9 min-w-9"
            onClick={addInput}
          >
            +
          </button>
          {additionalInputs.length > 0 && (
            <button
              className="btn-dc btn-dc-secondary min-h-9 min-w-9"
              onClick={removeInput}
            >
              -
            </button>
          )}
        </div>
      </div>
    </Collapsible>
  );
};
