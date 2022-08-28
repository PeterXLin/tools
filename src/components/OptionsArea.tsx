import * as React from 'react';
import List from '@mui/material/List';
import { Box, Button, TextField } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Option } from "./typeFile";
import { v4 as uuid } from 'uuid';

export default function OptionsArea(props: { allOptions: Option[], setAllOptions: Function, setUpdateWheel: Function }) {
    const [checked, setChecked] = React.useState([0]);
    const { allOptions, setAllOptions, setUpdateWheel } = props;

    // const handleToggle = (value: number) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };

    const addOptions = (): void => {
        setAllOptions([...allOptions, { id: uuid(), name: "", weight: 1, used: true }]);
        setUpdateWheel(true);
    };

    const handleUsedChange = (used: boolean, id: string): void => {
        const itemIndex = allOptions.findIndex(item => item.id === id);
        setAllOptions((options: Option[]) => [
            ...options.slice(0, itemIndex),
            {
                // spread all the other items in the object and update only the score
                ...options[itemIndex],
                used: used,
            },
            ...options.slice(itemIndex + 1),
        ]);
        setUpdateWheel(true);
        // console.log(options);
    };

    const handleRemoveOption = (id: string): void => {
        const itemIndex = allOptions.findIndex(item => item.id === id);
        setAllOptions([...allOptions.slice(0, itemIndex), ...allOptions.slice(itemIndex + 1)]);
        setUpdateWheel(true);
    };

    const handleNameChange = (newName: string, id: string) => {
        const itemIndex = allOptions.findIndex(item => item.id === id);
        setAllOptions((options: Option[]) => [
            ...options.slice(0, itemIndex),
            {
                // spread all the other items in the object and update only the score
                ...options[itemIndex],
                name: newName,
            },
            ...options.slice(itemIndex + 1),
        ]);
    }

    return (
        <Box sx={{ mt: 5, width: "100%", maxWidth: 400, border: 5, borderColor: 'info.main', maxHeight: 600, borderRadius: 5 }}>
            <List sx={{
                width: '90%', maxWidth: 400, overflow: 'auto', height: "80%",
                maxHeight: 500, bgcolor: 'background.paper',
                ml: "6%", mt: "5%"
            }}>
                {allOptions.map((value) => {
                    const labelId: string = `checkbox-list-label-${value.id}`;
                    return (
                        <ListItem
                            key={value.id}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    checked={value.used}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUsedChange(event.target.checked, value.id)}
                                // onClick={handleToggle(value)}
                                />
                            }
                            // disablePadding
                            sx={{ bgcolor: "secondary.main", mb: 1, borderRadius: 2 }}
                        >
                            <ListItemIcon>
                                <IconButton aria-label="delete" onClick={() => handleRemoveOption(value.id)}>
                                    <CloseIcon />
                                </IconButton>
                            </ListItemIcon>
                            <TextField
                                id="outlined-basic"
                                color="success"
                                variant="outlined"
                                label="選項"
                                defaultValue={value.name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleNameChange(event.target.value, value.id); }} />
                            {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
                        </ListItem>
                    );
                })}
            </List>
            <Button startIcon={<AddIcon />}
                variant="contained"
                onClick={addOptions}
                sx={{ width: "90%", my: 3, mx: "5%", bgcolor: "primary.main", borderRadius: 3 }}
                style={{ fontWeight: "bold", fontSize: "18px" }}
            >
                新增選項
            </Button>
        </Box>
    );
}
