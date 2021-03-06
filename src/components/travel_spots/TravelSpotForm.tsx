import NextImage from "next/image";
import Script from "next/script";
import { NextRouter, useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, VFC } from "react";
import { FieldError, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import { useHandleImage } from "hooks/useHandleImage";
import { Genre, Prefecture, TravelSpot, User } from "types";

import { DownloadIcon, PlusSquareIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, VStack, Button, IconButton, Badge, Input, Textarea, Select, FormControl, FormLabel, FormErrorMessage, Center } from "@chakra-ui/react";

type Props = {
  users: User[];
  genres: Genre[];
  prefectures: Prefecture[];
  setImages: Dispatch<SetStateAction<File[]>>;
  previewImageUrls: string[];
  setPreviewImageUrls: Dispatch<SetStateAction<string[]>>;
  handleSubmit: UseFormHandleSubmit<TravelSpot>;
  onSubmit: (inputData: TravelSpot) => void;
  register: UseFormRegister<TravelSpot>;
  errors: {
    userId?: FieldError | undefined;
    genreId?: FieldError | undefined;
    name?: FieldError | undefined;
    postcode?: FieldError | undefined;
    prefectureCode?: FieldError | undefined;
    addressCity?: FieldError | undefined;
    addressStreet?: FieldError | undefined;
    addressBuilding?: FieldError | undefined;
    introduction?: FieldError | undefined;
    access?: FieldError | undefined;
    phoneNumber?: FieldError | undefined;
    businessHour?: FieldError | undefined;
    parking?: FieldError | undefined;
    homePage?: FieldError | undefined;
  };
};

export const TravelSpotForm: VFC<Props> = (props) => {
  const router: NextRouter = useRouter();
  const { uploadImage, deleteImage } = useHandleImage();

  return (
    <Box>
      <Script src="https://ajaxzip3.github.io/ajaxzip3.js" />
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <VStack>
          <Input
            id="travel_spot_images"
            type="file"
            accept="image/*"
            multiple
            display="none"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              uploadImage({ event, isMultiple: true, setImgState: props.setImages, setPrevieImgState: props.setPreviewImageUrls });
            }}
          />
          <Button colorScheme="orange" mb={4} onClick={() => document.getElementById("travel_spot_images")?.click()}>
            <PlusSquareIcon mr={1} />
            ????????????????????????
          </Button>
        </VStack>

        <Grid my={4} templateColumns="repeat(4, 1fr)" gap={3}>
          {props.previewImageUrls.map((url: string, index: number) => (
            <GridItem key={index}>
              <NextImage src={url} alt={`?????????????????????${index}`} width={300} height={300} />
              <IconButton
                aria-label="delete_image"
                icon={<CloseIcon />}
                onClick={() => {
                  deleteImage({ deleteImageUrl: url, setPrevieImgState: props.setPreviewImageUrls });
                }}
              />
            </GridItem>
          ))}
        </Grid>

        <FormControl isInvalid={!!props.errors.name} mb={4}>
          <FormLabel>
            ??????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Input {...props.register("name", { required: "?????????????????????????????????", maxLength: { value: 30, message: "30?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.postcode} mb={4}>
          <FormLabel>
            ????????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Input
            // @ts-ignore
            onKeyUp={() => AjaxZip3.zip2addr("postcode", "", "prefectureCode", "addressCity")}
            {...props.register("postcode", {
              required: "???????????????????????????????????????",
              pattern: {
                value: /^[0-9]{3}-[0-9]{4}$/,
                message: "????????????????????????????????????",
              },
            })}
          />
          <FormErrorMessage>{props.errors.postcode?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.prefectureCode} mb={4}>
          <FormLabel>
            ????????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Select {...props.register("prefectureCode", { required: "???????????????????????????????????????" })}>
            <option></option>
            {props.prefectures.map((prefecture) => (
              <option key={prefecture.code} value={prefecture.code}>
                {prefecture.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{props.errors.prefectureCode?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.addressCity} mb={4}>
          <FormLabel>
            ????????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Input {...props.register("addressCity", { required: "???????????????????????????????????????", maxLength: { value: 50, message: "50?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.addressCity?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.addressStreet} mb={4}>
          <FormLabel>
            ??????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Input {...props.register("addressStreet", { required: "?????????????????????????????????", maxLength: { value: 50, message: "50?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.addressStreet?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.addressBuilding} mb={4}>
          <FormLabel>
            ??????
            <Badge colorScheme="gray" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Input {...props.register("addressBuilding", { maxLength: { value: 50, message: "50?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.addressBuilding?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.introduction} mb={4}>
          <FormLabel>
            ?????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Textarea {...props.register("introduction", { required: "????????????????????????????????????", maxLength: { value: 400, message: "400?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.introduction?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.access} mb={4}>
          <FormLabel>
            ????????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Textarea {...props.register("access", { required: "???????????????????????????????????????", maxLength: { value: 200, message: "200?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.access?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.businessHour} mb={4}>
          <FormLabel>
            ????????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Textarea {...props.register("businessHour", { required: "???????????????????????????????????????", maxLength: { value: 100, message: "100?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.businessHour?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.phoneNumber} mb={4}>
          <FormLabel>
            ????????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Input
            {...props.register("phoneNumber", {
              required: "???????????????????????????????????????",
              pattern: {
                value: /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/,
                message: "????????????????????????????????????",
              },
            })}
          />
          <FormErrorMessage>{props.errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.parking} mb={4}>
          <FormLabel>
            ?????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Textarea {...props.register("parking", { required: "????????????????????????????????????", maxLength: { value: 300, message: "300?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.parking?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.homePage} mb={4}>
          <FormLabel>
            ??????????????????
            <Badge colorScheme="gray" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Textarea {...props.register("homePage", { maxLength: { value: 100, message: "100?????????????????????????????????" } })} />
          <FormErrorMessage>{props.errors.homePage?.message}</FormErrorMessage>
        </FormControl>

        {router.pathname.match(/admin/) && (
          <FormControl isInvalid={!!props.errors.userId} mb={4}>
            <FormLabel>
              ?????????
              <Badge colorScheme="red" ml={1}>
                ??????
              </Badge>
            </FormLabel>
            <Select {...props.register("userId", { required: "????????????????????????????????????" })}>
              <option></option>
              {props.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{props.errors.userId?.message}</FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={!!props.errors.genreId} mb={4}>
          <FormLabel>
            ????????????
            <Badge colorScheme="red" ml={1}>
              ??????
            </Badge>
          </FormLabel>
          <Select {...props.register("genreId", { required: "???????????????????????????????????????" })}>
            <option></option>
            {props.genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{props.errors.genreId?.message}</FormErrorMessage>
        </FormControl>

        <Center>
          <Button type="submit" colorScheme="teal" leftIcon={<DownloadIcon />} my={4}>
            ??????
          </Button>
        </Center>
      </form>
    </Box>
  );
};
