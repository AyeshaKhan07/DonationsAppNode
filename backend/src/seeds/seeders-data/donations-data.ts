import { CreateDonationDto } from "../../modules/donations/dto/create-donation.dto";

/**
 * Caution: Don't change the data below, testcases depend on the following data. New data can be added,
 * mutating or removing existing data is restricted
 */

const donations: CreateDonationDto[] = [
    {
        id: 1,
        amount: 2000,
        donationType: 1,
        page: 1,
        paymentMethod: 1,
        city: 1,
        anonymousDonation: false,
        transactionFeeCovered: false,
        user: 2
    }, 
    {
        id: 2,
        amount: 1000,
        donationType: 1,
        page: 2,
        paymentMethod: 1,
        city: 1,
        anonymousDonation: true,
        transactionFeeCovered: false,
        user: 1,
        donatedTo: 3
    }, 
    {
        id: 3,
        amount: 500,
        donationType: 2,
        page: 3,
        paymentMethod: 1,
        city: 1,
        anonymousDonation: false,
        transactionFeeCovered: false,
        user: 4
    }, 
    {
        id: 5,
        amount: 2000,
        donationType: 1,
        page: 6,
        paymentMethod: 1,
        city: 1,
        anonymousDonation: false,
        transactionFeeCovered: false,
        user: 2
    },
    {
        id: 6,
        amount: 2000,
        donationType: 1,
        page: 6,
        paymentMethod: 1,
        city: 1,
        anonymousDonation: false,
        transactionFeeCovered: false,
        user: 3,
        donatedTo: 4
    },
];

export default donations;