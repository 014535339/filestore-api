/**
 * @author Praveen Kumar Thakur
 */

"use strict";

module.exports = Object.freeze({

    "INTERNAL_SERVER_ERROR"   : { statusCode : 500, errorCode : 'INTERNAL_01', message : "Internal server error occurred."},

    "DEP_ID_NOT_NUMBER" : { statusCode : 500, errorCode : 'DEP_01', message : "Department ID given in path is not a number."},
    "DEP_ID_DO_NOT_EXISTS"   : { statusCode : 500, errorCode : 'DEP_02', message : "Department ID does not exists."},
    "DEP_ERROR_RETRIEVING_DEPARTMENTS" : { statusCode : 500, errorCode : 'DEP_03', message : "Internal error retrieving departments."},

    "CAT_ID_NOT_NUMBER" : { statusCode : 500, errorCode : 'CAT_01', message : "Category ID given in path is not a number."},
    "CAT_ID_DO_NOT_EXISTS"   : { statusCode : 500, errorCode : 'CAT_02', message : "Category ID does not exists."},
    "CAT_ERROR_RETRIEVING_CATEGORIES" : { statusCode : 500, errorCode : 'CAT_03', message : "Internal error retrieving categories."},


    "ATR_ID_NOT_NUMBER" : { statusCode : 500, errorCode : 'ATR_01', message : "Attribute ID given in path is not a number."},
    "ATR_ID_DO_NOT_EXISTS"   : { statusCode : 500, errorCode : 'ATR_02', message : "Attribute ID does not exists."},
    "ATR_ERROR_RETRIEVING_ATTRIBUTES" : { statusCode : 500, errorCode : 'ATR_03', message : "Internal error retrieving attributes."},
    "ATR_ERROR_RETRIEVING_ATTRIBUTE_VALUES" : { statusCode : 500, errorCode : 'ATR_04', message : "Internal error retrieving attribute values."},

    "PRD_ID_NOT_NUMBER" : { statusCode : 500, errorCode : 'PRD_01', message : "Product ID given in path is not a number."},
    "PRD_ID_NOT_EXIST" : { statusCode : 500, errorCode : 'PRD_02', message : "Product ID does not exists."},
    "PRD_ATR_ID_NOT_EXISTS" : { statusCode : 500, errorCode : 'PRD_03', message : "Attribute ID associated with product id does not exists."},
    "PRD_ERROR_RETRIEVING_PRODUCTS" : { statusCode : 500, errorCode : 'PRD_04', message : "Internal error retrieving products."},

    "RVW_ERROR_RETRIEVING_REVIEWS" : { statusCode : 500, errorCode : 'RVW_04', message : "Internal error retrieving reviews."},
    "RVW_ERROR_CREATING_REVIEWS" : { statusCode : 500, errorCode : 'RVW_04', message : "Internal error creating reviews."},

    "CUS_ERROR_REGISTERING_CUSTOMER" : { statusCode : 500, errorCode : 'CUS_01', message : "Internal error registering customer."},
    "CUS_ERROR_LOGIN" : { statusCode : 401, errorCode : 'CUS_02', message : "Invalid email or password."},
    "CUS_INVALID_AUTH_CODE" : { statusCode : 401, errorCode : 'CUS_03', message : "Invalid authorization code."},
    "CUS_NOT_EXIST" : { statusCode : 500, errorCode : 'CUS_04', message : "Customer with given email id does not exists."},
    "CUS_ERROR_RETRIEVING_CUSTOMER" : { statusCode : 500, errorCode : 'CUS_05', message : "Internal error while retrieving customer."},

    "CRT_ERROR_RETRIEVING_CART_ITMES" : { statusCode : 500, errorCode : 'CRT_01', message : "Internal error retrieving cart items."},
    "CRT_NO_ITEM_FOUND_WITH_ITEM_ID_IN_CART" : { statusCode : 500, errorCode : 'CRT_02', message : "No such item exists in cart."},
    "CRT_ERROR_UPDATING_QUANTITY_OF_ITEM_IN_CART" : { statusCode : 500, errorCode : 'CRT_03', message : "Internal error while updating quantity of item in cart."},
    "CRT_ERROR_REMOVING_CART_ITMES" : { statusCode : 500, errorCode : 'CRT_04', message : "Internal error removing cart items."},
    "CRT_ERROR_RETRIEVING_TOTAL_AMOUNT" : { statusCode : 500, errorCode : 'CRT_05', message : "Internal error retrieving total amount."},
    "CRT_ERROR_UPDATING_ITEM_TO_SAVE_FOR_LATER" : { statusCode : 500, errorCode : 'CRT_03', message : "Internal error while updating item to save for later."},

    "TAX_ERROR_RETRIEVING_TAXES" : { statusCode : 500, errorCode : 'TAX_01', message : "Internal error retrieving taxes."},
    "TAX_ID_NOT_EXIST" : { statusCode : 500, errorCode : 'TAX_02', message : "Tax ID does not exists."},

    "SHR_ERROR_RETRIEVING_SHIPPING_REGIONS" : { statusCode : 500, errorCode : 'SHR_01', message : "Internal error retrieving Shipping Region."},
    "SHR_ID_NOT_EXIST" : { statusCode : 500, errorCode : 'SHR_02', message : "Shipping Region ID does not exists."},


    "ORD_ERROR_CREATING_ORDER" : { statusCode : 500, errorCode : 'CRT_05', message : "Internal error creating order."}
    
});
