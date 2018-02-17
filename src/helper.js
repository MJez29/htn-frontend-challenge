let helper = {
    padTime: (n) => {
        if (n < 10) {
            return "0" + n;
        } else {
            return "" + n;
        }
    },

    toWeekday: (n) => {
        switch (n) {
            case 0:
                return "Sun";
            case 1: 
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
        }
    }
}

export default helper;