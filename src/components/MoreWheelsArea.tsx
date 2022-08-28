import React from 'react';
import { Box, Button, TextField, List, ListItem, ListItemIcon, IconButton, ListItemButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { SpinTheWheel } from "./typeFile";
import { v4 as uuid } from 'uuid';
import DoneIcon from '@mui/icons-material/Done';


const MoreWheelsArea = (props: {
    spinWheelList: SpinTheWheel[], setSpinWheelList: Function,
    currentWheelId: string, setCurrentWheelId: Function
}) => {
    const { spinWheelList, setSpinWheelList, currentWheelId, setCurrentWheelId } = props;


    const handleChangeWheelTitle = (newTitle: string, wheelID: string): void => {
        const index = spinWheelList.findIndex(item => item.id === wheelID);
        setSpinWheelList(
            [...spinWheelList.slice(0, index),
            { ...spinWheelList[index], title: newTitle },
            ...spinWheelList.slice(index + 1)]);
    }

    const handleRemoveWheel = (wheelID: string): void => {
        const index = spinWheelList.findIndex(item => item.id === wheelID);
        const wheelAmount = spinWheelList.length;
        setSpinWheelList(
            [...spinWheelList.slice(0, index),
            ...spinWheelList.slice(index + 1)]
        );
        localStorage.removeItem(wheelID);

        // current wheel is removed
        if (wheelID === currentWheelId) {
            // current wheel is the only one wheel
            if (wheelAmount > 1) {
                setCurrentWheelId(spinWheelList[0].id);
            } else {
                const newID: string = uuid();
                setSpinWheelList([{
                    id: newID,
                    title: "轉盤",
                }]);
                setCurrentWheelId(newID);
            }
        }
    }

    const handleAddWheel = (): void => {
        setSpinWheelList(
            [...spinWheelList,
            { id: uuid(), title: "轉盤" }]
        );
    }

    const handleChooseWheel = (wheelId: string): void => {
        setCurrentWheelId(wheelId);
    }


    return (
        <Box sx={{
            mt: 5, ml: "10%", width: "90%",
            maxWidth: 400, border: 5,
            borderColor: 'primary.main',
            maxHeight: 600, borderRadius: 5,
            bgcolor: "primary.main",
        }}>
            <List sx={{
                width: '90%', maxWidth: 400, overflow: 'auto', height: "80%",
                maxHeight: 500, bgcolor: 'primary.main',
                ml: "6%", mt: "5%"
            }}>
                {spinWheelList.map((value) => {
                    return (
                        <ListItem
                            key={value.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="choose wheel" onClick={() => { handleChooseWheel(value.id) }}>
                                    <DoneIcon />
                                </IconButton>
                            }
                            sx={{
                                bgcolor: "secondary.main", mb: 1, borderRadius: 2,
                                border: 4, borderColor: currentWheelId === value.id ? "success.main" : "secondary.main"
                            }}
                        >

                            <ListItemIcon>
                                <IconButton aria-label="delete" onClick={() => { handleRemoveWheel(value.id) }}>
                                    <CloseIcon />
                                </IconButton>
                            </ListItemIcon>
                            <TextField
                                id="outlined-basic"
                                color="success"
                                variant="outlined"
                                label="轉盤名稱"
                                defaultValue={value.title}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChangeWheelTitle(event.target.value, value.id) }} />
                        </ListItem>
                    );
                })}
            </List>

            <Button
                // onClick={addOptions}
                variant="contained"
                color="success"
                sx={{ width: "90%", my: 3, mx: "5%", borderRadius: 3 }}
                style={{ fontWeight: "bold", fontSize: "18px" }}
                onClick={() => { handleAddWheel(); }}
            >
                新增轉盤
            </Button>
        </Box >
    )
}


export default MoreWheelsArea;