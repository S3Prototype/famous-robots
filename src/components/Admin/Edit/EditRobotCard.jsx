import React, { useRef, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Card,
  Typography,
  TextField,
  Container,
} from "@material-ui/core";
import { Dialog, Modal, makeStyles, CircularProgress } from "@material-ui/core";
import { useRobotContext } from "../../../contexts/RobotContext";
import { useUserContext } from "../../../contexts/UserContext";
import ErrorMessage from "../../Errors/ErrorMessage";
import MondoPopover from "../../CustomPopovers/MondoPopover";
import ProgressSpinner from "../ProgressSpinner";
import CardImageContainer from "../Cards/CardImageContainer";
import ChooseImageToolTip from "./ChooseImageToolTip";
import CardContainer from "../Cards/CardContainer";
import PreviewImage from "../Cards/PreviewImage";
import EditButtonSet from "./EditButtonSet";
import RobotCardContainer from "../../Robots/RobotCardContainer";

const useStyles = makeStyles((them) => ({
  robotCard: {
    paddingTop: 30,
    paddingBottom: 30,
    maxWidth: 400,
    display: "flex",
    justifyContent: "center",
  },
  robotName: {
    fontFamily: "Helvetica Bold",
  },
}));

function EditRobotCard(props) {
  const classes = useStyles();

  const robotSet = useRobotContext();
  const user = useUserContext();

  const gridRef = useRef(null);

  const { popoverController } = props;

  const basicButtonStyles = {
    fontFamily: "Helvetica Bold",
    minHeight: 50,
    minWidth: 100,
  };

  const fileRef = useRef(null);

  const starterImage = props.robot ? props.robot.image : null;
  const starterName = props.robot ? props.robot.name : "";
  const [previewImage, setPreviewImage] = useState(starterImage);
  const newRobotNameRef = useRef("");
  const [newRobotName, setNewRobotName] = useState(
    newRobotNameRef.current ? newRobotNameRef.current.value : ""
  );
  const checkIfShouldDisable = () =>
    newRobotName == starterName ||
    newRobotName == "" ||
    previewImage == starterImage;
  const [disableAddButton, setDisableAddButton] = useState(
    checkIfShouldDisable()
  );

  const updateNewRobotName = (e) => {
    setNewRobotName(e.target.value);
    if (e.target.value == "" || e.target.value == starterName)
      setDisableAddButton(true);
    else setDisableAddButton(checkIfShouldDisable());
  };

  const clearValues = () => {
    setPreviewImage(starterImage);
    newRobotNameRef.current.value = "";
    setDisableAddButton(true);
    setNewRobotName(starterName);
  };

  const uploadCard = async () => {
    setShouldShowProgress(true);
    try {
      const uploadResult = await fetch(
        "https://famous-robots-docker-backend.onrender.com/robots/add",
        {
          method: "POST",
          body: JSON.stringify({
            data: previewImage,
            name: newRobotName,
          }),
          headers: {
            "Content-Type": `application/json`,
            authorization: `Bearer ${user.data.accessToken}`,
          },
        }
      );

      const status = uploadResult.status;
      const uploadResultJSON = await uploadResult.json();

      if (status === 201 || status === 200) {
        robotSet.updateRobots(uploadResultJSON.robotSet);
        props.setRobotList(uploadResultJSON.robotSet);
        setShouldShowProgress(false);
        return clearValues();
      }

      throw new Error(uploadResultJSON.message);
    } catch (err) {
      setShouldShowProgress(false);
      return setErrorMessage(`Error uploading robot: ${err.message}`);
    }
  };

  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const editData = {
    newRobotName,
    starterName,
    previewImage,
    starterImage,
    setRobotList: props.setRobotList,
    setPreviewImage,
    setErrorMessage,
    setShouldShowProgress,
    updateEditCards: props.updateEditCards,
    basicButtonStyles,
  };

  return shouldShowProgress ? (
    <ProgressSpinner gridRef={gridRef} />
  ) : (
    <CardContainer>
      <Typography className={classes.robotName}>Add Robot</Typography>
      <TextField
        onChange={updateNewRobotName}
        inputRef={newRobotNameRef}
        defaultValue={starterName}
        placeholder={starterName}
        variant="outlined"
        label="Name"
        style={{ width: "90%" }}
      />
      <CardImageContainer>
        <ChooseImageToolTip fileRef={fileRef} previewImage={previewImage} />
        <PreviewImage fileRef={fileRef} previewImage={previewImage} />
      </CardImageContainer>
      <EditButtonSet fileRef={fileRef} robot={props.robot} data={editData} />
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </CardContainer>
  );
}

export default EditRobotCard;
