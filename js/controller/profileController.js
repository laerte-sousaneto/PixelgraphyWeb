/**
 * Created by Lae on 7/28/2014.
 */

'use strict';

pixelApp.controller('profileController', profileController);

function profileController($scope, userService, dataModifier)
{
    $scope.data = userService.userProfile;

    $scope.verticalTab = true;
    $scope.albums = userService.albums;
    $scope.currentAlbum = [];

    $scope.showImages = false;
    $scope.albumImages = [];

    $scope.removalIndex = null;
    $scope.removalImageImage = null;

    $scope.selectedImageIndex = null;
    $scope.selectedImage = null;

    $scope.albumRemovalIndex = null;
    $scope.removalAlbum = null;

    if($scope.albums == null)
    {
        userService.updateAlbums();
    }

    if(userService.userProfile == null)
    {
        userService.updateUserProfile();
    }

    $scope.$on('profileUpdate',function()
    {
        $scope.data = userService.userProfile;
    });

    $scope.$on('albums', function()
    {
        $scope.albums = userService.albums;
        console.log($scope.albums);
    });

    $scope.showAlbumImages = function(index)
    {
        $scope.showImages = true;
        $scope.albumImages = $scope.albums[index].images;
    };

    $scope.removeAlbum = function(index)
    {
        dataModifier.removeAlbum($scope.albums[index].ID, function(data)
        {
            if(data == true)
            {
                userService.updateAlbums();
            }
        });

        $('#albumRemovalModal').modal('hide');
    };

    $scope.removeImage = function(index)
    {
        dataModifier.removeImage($scope.albumImages[index].ID, function(data)
        {
            if(!data['error'])
            {
                $scope.albumImages.splice(index,1);
            }

            $('#imageRemovalModal').modal('hide');
        });
    };

    $scope.toggleImages = function()
    {
        $scope.showImages = !$scope.showImages;
    };

    $scope.openImageRemovalModal = function(index)
    {
        $('#imageRemovalModal').modal('show');

        $scope.removalIndex = index;
        $scope.removalImage = $scope.albumImages[index];
    };

    $scope.openImageEditorModal = function(index)
    {
        $('#imageEditorModal').modal('show');

        $scope.selectedImageIndex = index;
        $scope.selectedImage = $scope.albumImages[index];
    };

    $scope.updateImageInfo = function()
    {
        if($scope.selectedImage != null)
        {
            dataModifier.updateImageInfo($scope.selectedImage,'', function(data)
            {
                if(data == '')
                {
                    userService.updateAlbums();
                }

            });
        }
    };

    $scope.dismissImageRemovalModal = function()
    {
        $('#imageRemovalModal').modal('hide');
    };

    $scope.openAlbumRemovalModal = function(index)
    {
        $scope.albumRemovalIndex = index;
        $scope.removalAlbum = $scope.albums[index];

        $("#albumRemovalModal").modal('show');
    };

    $scope.dismissAlbumRemovalModal = function()
    {
        $("#albumRemovalModal").modal('hide');
    };

    $scope.openInfoEditModal = function()
    {
        $("#infoEditModal").modal('show');
    };

    $scope.openAboutEditModal = function()
    {
        $("#aboutEditModal").modal('show');
    };

    $scope.convertToDate = function (stringDate)
    {
        var dateOut = new Date(stringDate);
        dateOut.setDate(dateOut.getDate() + 1);
        return dateOut;
    };

    $scope.isNameValid = function(name)
    {
        var regex = new RegExp("^(([a-zA-Z0-9\\s\\.\\'\\()\\%\\@\\:\\,]){3,25})$");
        return regex.test(name);
    };

    $scope.isDescriptionValid = function(description)
    {
        var regex = new RegExp("^(([a-zA-Z0-9\\s\\n\\.\\'\\()\\%\\@\\:\\,]){10,150})$");
        return regex.test(description);
    };

    $scope.isAlbumValid = function()
    {
        var regex = new RegExp("^(([a-zA-Z0-9\\s]){3,25})$");
        return regex.test($scope.newAlbum);
    };

    userService.updateAlbums();

    //$('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
    $(function () { $("[data-toggle='tooltip']").tooltip({'placement': 'top'}); });

    $scope.uploadFile = function(file)
    {
        var url = "php/Modifiers/uploadImage.php";
        var xhr = new XMLHttpRequest();
        var fileData = new FormData();

        $scope.data['profile_picture'] = "image/loading.gif";

        xhr.open("POST", url, true);

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                console.log(xhr.responseText);
                if(xhr.response == 'File Uploaded')
                {
                    userService.updateUserProfile();
                }
            }
        };


        fileData.append('file', file);
        fileData.append('isProfile', true);

        // Initiate a multipart/form-data upload
        xhr.send(fileData);
    };
}


pixelApp.directive("readProfile", function ($timeout)
{
    return {

        link: function (scope, element)
        {
            element.unbind("change").bind("change", function (changeEvent)
            {

                if(!scope.$$phase)
                {
                    console.log(changeEvent.target.files[0]);
                    $timeout(function()
                    {
                        //scope.$apply(function(){scope.newFiles = changeEvent.target.files;});
                        scope.uploadFile(changeEvent.target.files[0]);
                    },500);

                }

            });
        }
    }
});