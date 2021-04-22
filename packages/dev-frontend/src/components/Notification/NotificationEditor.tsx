import React, { useRef, useState, useCallback } from "react";
import { Card, Box, Heading, Flex, Button, Label, Input } from "theme-ui";
import { InfoIcon } from "../InfoIcon";
import { useNotificationView } from "./context/NotificationViewContext";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { LoadingOverlay } from "../LoadingOverlay";

interface Props {
  isDisabled: boolean;
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;

}

const Checkbox = (props: Props) => {
  return (
      < Flex >
      <input
        type="checkbox"
        disabled={props.isDisabled}
        checked={props.isChecked}
        onChange={props.handleChange}
      />
      <Label htmlFor={props.label}>{props.label}</Label>
      </Flex>
  );
};

type NotificationEditorProps = {
  title: string;
  troveStatus: string;
  isWaiting: boolean;
};

//TODO: Moure tota la logica al Notification manager o a un altre lloc, i deixar aquí només la part 'css'
export const NotificationEditor: React.FC<NotificationEditorProps> = ({
  children,
  title,
  troveStatus,
  isWaiting,
}) => {

  //troveStatus === "closedByLiquidation"
  //troveStatus === "closedByRedemption"
  //troveStatus === "open"

  const { dispatchEvent } = useNotificationView();
  const { library: provider, account, chainId } = useWeb3React<Web3Provider>();

  const handleCancel = useCallback(() => {
    dispatchEvent("CANCEL_NOTIFICATION_PRESSED");
  }, [dispatchEvent]);

  const emailInputRef = useRef<HTMLInputElement>(null)

  const [isCheckedICR, setIsCheckedICR] = useState(false);
  const handleChangeICR = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsCheckedICR(e.target.checked);
    };

  const thresholdRef = useRef<HTMLInputElement>(null)

  const [isCheckedReport, setIsCheckedReport] = useState(false);
  const handleChangeReport = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsCheckedReport(e.target.checked);
    };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    dispatchEvent("WAITING_NOTIFICATION_PRESSED")

    const enteredEmail = emailInputRef.current!.value
    //TODO:
    // - add email format validation
    // - verify that at least one checkbox has been selected
    const enteredThreshold = thresholdRef.current!.value

    //https://stackoverflow.com/questions/59109737/how-to-make-a-javascript-react-typescript-fetch-call-asynchronous
    const response = fetch( "http://localhost:4000",
                           {
                            method: 'POST',
                            body: JSON.stringify({'trove':account,
                                                  'network':'mainnet',
                                                  'email':enteredEmail,
                                                  'ICR': isCheckedICR,
                                                  'threshold':enteredThreshold,
                                                  'report': isCheckedReport}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                           }
                          )
                          .then((response) => {return response})
                          .then(()=> {setTimeout(() => { dispatchEvent("SUBMITOK_NOTIFICATION_PRESSED") }, 3000)})
                          .catch((error) => {setTimeout(() => { dispatchEvent("SUBMITKO_NOTIFICATION_PRESSED") }, 3000)})

    // if (response) {        setTimeout(() => { dispatchEvent("SUBMITOK_NOTIFICATION_PRESSED") }, 2000);}
    // else{ setTimeout(() => { dispatchEvent("SUBMITKO_NOTIFICATION_PRESSED") }, 3000);}
 }

  return (
  <Card>
      <Heading>Notifications
          <InfoIcon
                tooltip={
                  <Card variant="tooltip">
                    Select which notification alerts doy you want to receive in your email
                  </Card>
                }
              />
      </Heading>

        <Box sx={{ p: [2, 3] }}>
          <form onSubmit={submitHandler}>

            <Flex sx={{ alignItems: "stretch", marginBottom: "10px" }}>
              <Input type="text"
                 placeholder="Please enter email"
                 ref={emailInputRef}/>
            </Flex>

            <Flex sx={{ alignItems: "stretch" }}>
                <Checkbox
                    handleChange={handleChangeICR}
                    isChecked={isCheckedICR}
                    isDisabled={troveStatus != "open"}
                    label = "ICR"
                />
                <Flex sx={{ marginLeft: "30px" }} >
                    <Label variant="unit">%</Label>
                <Input type="number"
                       disabled={!isCheckedICR}
                       placeholder="110.0%"
                       ref={thresholdRef}
                       step="0.5"
                       min="110.0"/>
                <InfoIcon tooltip={<Card variant="tooltip">ICR Notification can only be selected if a Trove is open</Card>}/>
                </Flex>
            </Flex>

            <Flex sx={{ marginTop: "5px" }}>
                <Checkbox
                    handleChange={handleChangeReport}
                    isChecked={isCheckedReport}
                    isDisabled={false}
                    label = "Daily Report"
                />
            </Flex>

            <Flex variant="layout.actions" sx={{ marginTop: "10px" }}>
                <Button variant="cancel" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button>Submit</Button>
            </Flex>
         </form>
      </Box>
      {isWaiting && <LoadingOverlay />}
    </Card>

  );
};

