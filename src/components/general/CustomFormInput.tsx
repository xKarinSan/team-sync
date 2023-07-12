import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function CustomFormInput({
    placeholder,
    formLabel,
    formType,
    value,
    formId,
    changeHandler,
}: {
    placeholder?: string;
    formLabel?: string;
    formType?: string;
    value: any;
    formId: string;
    changeHandler: (e: any) => void;
}) {
    return (
        <FormControl id={formId}>
            {formLabel ? (
                <>
                    {" "}
                    <FormLabel>{formLabel}</FormLabel>
                </>
            ) : null}

            <Input
                type={formType ? formType : "text"}
                placeholder={placeholder ? placeholder : "Enter a placeholder"}
                value={value}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </FormControl>
    );
}
