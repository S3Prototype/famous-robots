import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useRobotContext } from "../../../contexts/RobotContext";
import { useUserContext } from "../../../contexts/UserContext";

function EditButtonSet(props) {
  const user = useUserContext();
  const robotSet = useRobotContext();

  const {
    newRobotName,
    starterName,
    previewImage,
    setPreviewImage,
    starterImage,
    setErrorMessage,
    setShouldShowProgress,
    basicButtonStyles,
    setRobotList,
    updateEditCards,
  } = props.data;

  const editRobotOnServer = async () => {
    if (newRobotName === starterName && previewImage === starterImage)
      return setErrorMessage(`Please modify the robot before saving it.`);

    setShouldShowProgress(true);
    try {
      const editRequest = await fetch(
        `https://famous-robots-docker-backend.onrender.com/robots/edit`,
        {
          method: "POST",
          body: JSON.stringify({
            original: props.robot,
            new: {
              imageData: previewImage,
              name: newRobotName || props.robot.name,
              email: user.data.email,
            },
          }),
          headers: {
            "Content-Type": `application/json`,
            authorization: `Bearer ${user.data.accessToken}`,
          },
        }
      );

      const status = editRequest.status;
      const editJSON = await editRequest.json();

      if (status === 201 || status === 200) {
        robotSet.updateRobots(editJSON.robotSet);
        updateEditCards({ type: "remove", id: props.robot._id });
        setShouldShowProgress(false);
        return setRobotList(editJSON.robotSet);
      }

      throw new Error(editJSON.message);
    } catch (err) {
      setErrorMessage(`Error trying to edit robot: ${err.message}`);
      setShouldShowProgress(false);
      return;
    }
  };

  return (
    <Grid style={{ columnGap: 20 }} justify="center" container>
      <Button
        onClick={() => updateEditCards({ type: "remove", id: props.robot._id })}
        style={basicButtonStyles}
      >
        Cancel
      </Button>
      <Button
        onClick={editRobotOnServer}
        style={basicButtonStyles}
        color="primary"
        variant="contained"
      >
        Save
      </Button>
      <input
        type="file"
        ref={props.fileRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function go() {
              setPreviewImage(this.result);
            });
            reader.readAsDataURL(file);
          }
        }}
      />
    </Grid>
  );
}

export default EditButtonSet;
