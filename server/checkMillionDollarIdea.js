const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    // const numWeeks = req.body.numWeeks;
    // const weeklyRevenue = req.body.weeklyRevenue;
    const totalMoney = Number(numWeeks) * Number(weeklyRevenue);
    if (
        !numWeeks ||
        !weeklyRevenue ||
        isNaN(totalMoney) ||
        totalMoney < 1000000
    ) {
        res.status(400).send();
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
