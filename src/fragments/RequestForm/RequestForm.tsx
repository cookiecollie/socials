import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Textarea,
    Tooltip,
} from "@chakra-ui/react"
import { useState } from "react"
import { useInputValidate } from "../../utils/useInputValidate"
import { useRadioOnChange } from "../../utils/useRadioOnChange"
import { useStateCustom } from "../../utils/useStateCustom"

export const RequestForm = () => {
    const _validateEmail = useInputValidate("email")
    const _validateRefLinks = useInputValidate("none")

    const _handleRadioValue = useRadioOnChange("No")
    const _detailedBgState = useStateCustom(false)
    const _additionalCharState = useStateCustom(false)

    const _commTypes = [
        "Emotes",
        "Half Body",
        "Full Body",
        "Reference Sheet",
        "Plush Phone Wallpaper",
    ]

    const [commType, setCommType] = useState(_commTypes[0])

    const _handleCommTypeOnChange = (e: any) => {
        setCommType(e.target.value)
        _detailedBgState.setValue(false)
        _additionalCharState.setValue(false)
    }

    const _handleSubmit = (e: any) => {
        e.preventDefault()
        const _formValue = {
            email: e.target.elements["email"].value,
            name: e.target.elements["name"].value,
            "comm-type": e.target.elements["comm-type"].value,
            "detailed-bg": e.target.elements["detailed-bg"].checked,
            "additional-char": e.target.elements["additional-char"].checked,
            "ref-links": e.target.elements["ref-links"].value,
            "is-secret": e.target.elements["is-secret"].value,
            contacts: e.target.elements["contacts"].value,
            "extra-info": e.target.elements["extra-info"].value,
        }
        console.log(_formValue)
    }

    return (
        <form onSubmit={_handleSubmit}>
            <Stack gap={6}>
                <Box>
                    <FormControl isRequired isInvalid={_validateEmail.isError}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            onChange={_validateEmail.setInputValue}
                            name="email"
                        />
                        {_validateEmail.isEmpty ? (
                            <FormErrorMessage>
                                Field cannot be empty
                            </FormErrorMessage>
                        ) : !_validateEmail.isMatch ? (
                            <FormErrorMessage>
                                This is not a valid email
                            </FormErrorMessage>
                        ) : (
                            <></>
                        )}
                    </FormControl>
                </Box>

                <Box>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" />
                    </FormControl>
                </Box>

                <Box>
                    <FormControl isRequired>
                        <FormLabel>Commission type</FormLabel>
                        <Select
                            name="comm-type"
                            onChange={_handleCommTypeOnChange}
                        >
                            {_commTypes.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <CheckboxGroup>
                        <Stack>
                            <Checkbox
                                name="detailed-bg"
                                isDisabled={
                                    commType !== "Half Body" &&
                                    commType !== "Full Body"
                                }
                                isChecked={_detailedBgState.value}
                                onChange={() =>
                                    _detailedBgState.setValue(
                                        !_detailedBgState.value
                                    )
                                }
                            >
                                Detailed background
                            </Checkbox>
                            <Checkbox
                                name="additional-char"
                                isDisabled={commType !== "Full Body"}
                                isChecked={_additionalCharState.value}
                                onChange={() =>
                                    _additionalCharState.setValue(
                                        !_additionalCharState.value
                                    )
                                }
                            >
                                Additional character
                            </Checkbox>
                        </Stack>
                    </CheckboxGroup>
                </Box>

                <Box>
                    <FormControl
                        isRequired
                        isInvalid={_validateRefLinks.isError}
                    >
                        <FormLabel>Reference sheet links</FormLabel>
                        <Textarea
                            onChange={_validateRefLinks.setInputValue}
                            name="ref-links"
                        />
                        {_validateRefLinks.isEmpty && (
                            <FormErrorMessage>
                                Field cannot be empty
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </Box>

                <Box>
                    <FormControl>
                        <FormLabel>Secret commission?</FormLabel>
                        <RadioGroup
                            onChange={_handleRadioValue.setValue}
                            value={_handleRadioValue.value}
                            name="is-secret"
                        >
                            <Stack direction={"row"}>
                                <Radio value="Yes">Yes</Radio>
                                <Radio value="No">No</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Box>
                    <FormControl>
                        <FormLabel>Other means of contact</FormLabel>
                        <Textarea name="contacts" />
                    </FormControl>
                </Box>

                <Box>
                    <FormControl>
                        <FormLabel>Extra information</FormLabel>
                        <Textarea name="extra-info" />
                    </FormControl>
                </Box>

                <Flex justify={"center"}>
                    <Tooltip
                        label="Please check all the fields again for errors"
                        isDisabled={
                            !(
                                _validateEmail.isError ||
                                _validateRefLinks.isError
                            )
                        }
                    >
                        <Button
                            type="submit"
                            colorScheme="pink"
                            isDisabled={
                                _validateEmail.isError ||
                                _validateRefLinks.isError
                            }
                        >
                            Submit
                        </Button>
                    </Tooltip>
                </Flex>
            </Stack>
        </form>
    )
}