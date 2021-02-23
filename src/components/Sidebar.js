import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import message from "../properties/messagesForUser";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    fullList: {
        width: 'auto',
    },
    link: {
        "color": "inherit",
        "text-decoration": "none",
    }
}));

export default function Sidebar(props) {
    var index = 0;
    const classes = useStyles();
    const [visible, setVisible] = useState(false);


    const toggleSidebar = (open) => (event) => {

        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setVisible(open);
    }

    const list = () => (
        <div
            className={classes.list}
            role='presentation'
            onClick={toggleSidebar(false)}
            onKeyDown={toggleSidebar(false)}
        >
            <Typography variant="h6" color="inherit">
                {message.menu}
            </Typography>
            <Divider />
            <List>
                {
                    [
                        { text: message.Discounts, index: "/" },
                        { text: message.reports, index: "/reports" },
                        { text: message.pricesSetup, index: "/prices" }
                    ].map(
                        (e) => (
                            <Link to={e.index} className={classes.link}>
                                <ListItem button key={index++}>
                                    <ListItemText primary={e.text} />
                                </ListItem>
                            </Link>
                        ))
                }
            </List>
        </div>
    )

    return (
        <div>
            <React.Fragment>

                <IconButton
                    edge="start"
                    onClick={toggleSidebar(true)}
                    className={classes.menuButton}
                    color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                    open={visible}
                    onClose={toggleSidebar(false)}
                    onOpen={toggleSidebar(true)}
                >
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    )
}