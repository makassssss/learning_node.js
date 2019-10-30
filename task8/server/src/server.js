import app from './app';
import db from "./models";

app.listen(5000, () => {
    db.sequelize.sync();
});
