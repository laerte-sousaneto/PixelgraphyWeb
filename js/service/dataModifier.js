/**
 * Created by Lae on 8/7/2014.
 */
'use strict';

pixelApp.factory('dataModifier', function($http)
{

    return{
        createAlbum: function(name, onSuccess)
        {
            $http(
                {
                    method  :   'POST',
                    url     :   '../../php/Modifiers/createAlbum.php',
                    data    :   $.param({'name':name}),
                    headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        removeAlbum: function(id, onSuccess)
        {
            $http(
                {
                    method  :   'POST',
                    url     :   '../../php/Modifiers/removeAlbum.php',
                    data    :   $.param({'id':id}),
                    headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        removeImage: function(id, onSuccess)
        {
            $http(
                {
                    method  :   'POST',
                    url     :   '../../php/Modifiers/removeImage.php',
                    data    :   $.param({'id':id}),
                    headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        addComment: function(image_id, comment, onSuccess)
        {
            $http(
                {
                    method : 'POST',
                    url : '../../php/Modifiers/addImageComment.php',
                    data : $.param({'image_id':image_id, 'comment':comment}),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        updateProfile: function(data, onSuccess)
        {
            $http(
                {
                    method: 'POST',
                    url : '../../php/Modifiers/updateProfile.php',
                    data : $.param(data),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        updateAboutInfo: function(data, onSuccess)
        {
            $http(
                {
                    method: 'POST',
                    url : '../../php/Modifiers/updateAboutInfo.php',
                    data : $.param(data),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        register: function(email, password1, password2, onSuccess)
        {
            $http(
                {
                    method : 'POST',
                    url : '../../php/Modifiers/register.php',
                    data : $.param({'email':email,'password1':password1,'password2':password2 }),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        verifyAccount: function(username,code, onSuccess)
        {
            $http(
                {
                    method: 'POST',
                    url : '../../php/Modifiers/verifyAccount.php',
                    data :$.param({'username':username, 'code':code}),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        requestPasswordChange: function(email, onSuccess)
        {
            $http(
                {
                    method: 'POST',
                    url: '../../php/Modifiers/requestPasswordChange.php',
                    data: $.param({'email':email}),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        changePassword: function(code, newPassword, repeatPassword, onSuccess)
        {
            $http(
                {
                    method: 'POST',
                    url: '../../php/Modifiers/changePassword.php',
                    data: $.param({'hash':code, 'password1':newPassword, 'password2':repeatPassword}),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        },
        updateImageInfo: function(image, newAlbumID, onSuccess)
        {
            $http(
                {
                    method: 'POST',
                    url: '../../php/Modifiers/updateImageInfo.php',
                    data: $.param({'image': image, 'newAlbumID': newAlbumID}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                }
            ).success(onSuccess);
        }
    }
});