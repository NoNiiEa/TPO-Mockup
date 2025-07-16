import mongoose from "mongoose";

const RepoertSchema = new mongoose.Schema({
    CrimeType: { type: String, required: true },
    BankCaseID: { type: String, required: true },
    user: {
        prefix: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        idCard: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        phoneCarrier: { type: String, required: true },
        birthDate: {
            day: { type: Number, required: true },
            month: { type: Number, required: true },
            year: { type: Number, required: true },
        },
        idCardAddress: {
            address: { type: String, required: true },
            district: { type: String, required: true },
            subDistrict: { type: String, required: true },
            province: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        currentAddress: {
            address: { type: String, required: true },
            district: { type: String, required: true },
            subDistrict: { type: String, required: true },
            province: { type: String, required: true },
            postalCode: { type: String, required: true },
        }
    },
    previousAgency: {
        province: { type: String, default: "None"},
        agencyName: { type: String, default: "None"},
        agencyType: { type: String, default: "None"},
    },
    avaliableAgency: {
        province: { type: String, default: "None"},
        agencyName: { type: String, default: "None"},
        agencyType: { type: String, default: "None"},
    },
    crimeTitle: { type: String, required: true },
    crimeDescription: { type: String, required: true },
    tranfers: {
        type: [
            {
                owner: { type: String, required: true },
                accountType: { type: String, required: true },
                bankName: { type: String, required: true },
                accessNumber: { type: String, required: true },
                accountName: { type: String, required: true },
            }
        ],
        default: [],
    },
    datetime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    frudDetails: {type: String, required: true},
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Report = mongoose.models.Report || mongoose.model('Report', RepoertSchema);
export default Report;